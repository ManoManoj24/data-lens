#!/usr/bin/env python3
"""Merge original lesson bodies into src/data/curriculum.json and extend the glossary."""

import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data"


def load_py(name: str):
    path = Path(__file__).resolve().parent / name
    spec = importlib.util.spec_from_file_location(name.replace(".py", ""), path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def main():
    lessons = {}
    new_modules = []
    for filename in ("lesson_content_1.py", "lesson_content_2.py", "lesson_content_3.py"):
        mod = load_py(filename)
        lessons.update(mod.LESSONS)
        new_modules.extend(getattr(mod, "NEW_MODULES", []))

    base_curriculum = DATA / "curriculum.base.json"
source = base_curriculum if base_curriculum.exists() else DATA / "curriculum.json"
curriculum = json.loads(source.read_text())
    track_meta = {
        "lifecycle": {
            "summary": "Follow data from the decision to create it through use, sharing, archive, and destruction.",
            "blurb": "Seven stages, three public models, and the cross-cuts that never switch off.",
        },
        "governance": {
            "summary": "Decision rights, policies, councils, and the metrics that show governance is real.",
            "blurb": "Who may decide, by which rules, and how you know the rules are working.",
        },
        "dama-wheel": {
            "summary": "Eleven knowledge areas with data governance at the hub, taught as work rather than labels.",
            "blurb": "Architecture through quality, each one tied to a decision a team actually faces.",
        },
        "roles": {
            "summary": "Owners, stewards, custodians, sponsors, and the RACI that keeps those words honest.",
            "blurb": "Accountability, day-to-day care, and the forum that can make a standard stick.",
        },
        "quality-metadata": {
            "summary": "Fitness for use, and the metadata that makes data findable, traceable, and reusable.",
            "blurb": "Dimensions, monitors, catalogs, lineage, and FAIR applied with proportion.",
        },
        "mdm-reference": {
            "summary": "Shared entities, controlled lists, golden records, and the queues that keep them true.",
            "blurb": "Customers, products, codes, hierarchies, and day-2 stewardship.",
        },
    }

    seen = set()
    for track in curriculum["tracks"]:
        meta = track_meta[track["id"]]
        track["summary"] = meta["summary"]
        track["blurb"] = meta["blurb"]
        for module in track["modules"]:
            seen.add(module["id"])
            pack = lessons.get(module["id"])
            if not pack:
                raise SystemExit(f"missing lesson for {module['id']}")
            module["minutes"] = module.get("minutes", 14)
            extra = pack["extraQuiz"]
            module["quiz"] = module["quiz"] + extra
            module["lesson"] = {
                "concept": pack["concept"].strip(),
                "howItWorks": pack["howItWorks"].strip(),
                "example": pack["example"].strip(),
                "pitfalls": pack["pitfalls"],
                "checklist": pack["checklist"],
                "seeAlso": pack["seeAlso"],
            }

    mdm = next(track for track in curriculum["tracks"] if track["id"] == "mdm-reference")
    existing_ids = {module["id"] for module in mdm["modules"]}
    for module in new_modules:
        if module["id"] not in existing_ids:
            mdm["modules"].append(module)
            seen.add(module["id"])

    missing = set(lessons) - seen
    if missing:
        raise SystemExit(f"lessons not attached: {missing}")

    (DATA / "curriculum.json").write_text(json.dumps(curriculum, indent=2, ensure_ascii=False) + "\n")

    base_glossary = DATA / "glossary.base.json"
gsource = base_glossary if base_glossary.exists() else DATA / "glossary.json"
glossary = json.loads(gsource.read_text())
    extras = [
        {
            "term": "Match threshold",
            "definition": "A score boundary that separates automatic links, steward review, and non-matches when comparing records.",
        },
        {
            "term": "False positive match",
            "definition": "A match that treats two different real-world entities as the same one, often from a weak shared clue such as a household phone.",
        },
        {
            "term": "Unmerge",
            "definition": "The controlled reversal of a merge, restoring distinct identities and notifying consumers that relied on the combined record.",
        },
        {
            "term": "Crosswalk",
            "definition": "The stored mapping from a golden record back to the source systems and keys that contributed to it.",
        },
        {
            "term": "Hierarchy",
            "definition": "A governed parent-child structure among master entities, such as SKU to style to class, used for rollup and accountability.",
        },
        {
            "term": "Effective dating",
            "definition": "Recording when a value or relationship starts and ends so history stays true after a change.",
        },
        {
            "term": "System of record",
            "definition": "The designated authoritative system for a domain. Other copies are downstream, not competing sources of truth.",
        },
        {
            "term": "Stewardship queue",
            "definition": "The operational list of exceptions—match proposals, validation failures, change requests—that stewards work to a service level.",
        },
    ]
    have = {item["term"] for item in glossary["terms"]}
    for item in extras:
        if item["term"] not in have:
            glossary["terms"].append(item)
    (DATA / "glossary.json").write_text(json.dumps(glossary, indent=2, ensure_ascii=False) + "\n")
    print(f"modules={sum(len(t['modules']) for t in curriculum['tracks'])} terms={len(glossary['terms'])}")


if __name__ == "__main__":
    main()
