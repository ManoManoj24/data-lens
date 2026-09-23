# Original Data Lens lesson bodies, part 1 (lifecycle + governance).
# Prose is written for this site. Public sources are cited by title on each module.

LESSONS = {
  "lc-why": {
    "concept": """A lifecycle is a shared picture of what happens to data between the moment someone decides it should exist and the moment it is kept on purpose or removed on purpose. It is a teaching and planning map, not a software license and not a backup schedule. Teams use it to answer practical questions: why are we collecting this, where will it live, who may see it, and when must it stop existing.

Real work is rarely a straight line. Analysis sends you back to collection. A reuse request reopens a dataset you thought was finished. Public models from UW–Madison, NIST’s Research Data Framework (RDaF), and the USGS science data lifecycle all leave room for loops and parallel work. What they refuse is the idea that documentation, quality, and protection can wait until the end.

Beginners feel the payoff in three places. You collect less data you cannot defend. You stop treating “temporary” files as harmless. And you can explain a field to a skeptical colleague: why it exists, who decides, and when it goes. That explanation is the operating picture keyword lists never quite give.""",
    "howItWorks": """1. Name the asset and the decision it supports before you talk about tools.
2. Walk the stages you expect—plan, create, store, use, share, archive, destroy—and mark which ones will loop.
3. List cross-cuts that apply the whole way: quality, security and privacy, and metadata or lineage.
4. Assign an accountable owner for the decisions, even if one person later wears several hats.
5. Write the end state first: what will be retained, for how long, and what will be destroyed, including copies.""",
    "example": """Northline Outfitters wants a loyalty email on every receipt. A lifecycle conversation asks what the email is for (offers and order status), where the authoritative copy will live (the customer master, not the cashier’s spreadsheet), who may export it, and what happens 24 months after the account closes. The team cuts a proposed “household income” field because nobody can name a decision it improves. The remaining fields get a retention note before the form is built.""",
    "pitfalls": [
      "Treating the lifecycle as a one-time slide instead of a map you reopen when a new channel or partner appears.",
      "Assuming stages happen once and in order, then being surprised when analysis forces another collection.",
      "Parking quality, privacy, and metadata in a final ‘cleanup’ phase that never arrives.",
      "Describing tools (the warehouse, the PIM) as if they were the lifecycle itself.",
    ],
    "checklist": [
      "You can point to a purpose for each new field in one sentence.",
      "An owner is named for access, retention, and definition decisions.",
      "Copies are listed, including exports and personal drives.",
      "Cross-cuts (quality, protection, metadata) are assigned at every stage, not only at publish.",
      "The archive-or-destroy outcome is written before collection starts.",
    ],
    "seeAlso": ["lc-unified", "lc-compare", "gov-intro"],
    "extraQuiz": [
      {
        "q": "A lifecycle model is most useful when a new field is proposed because it forces the team to:",
        "choices": [
          "Pick a database vendor in the same meeting",
          "Name purpose, ownership, sharing, and end-of-life before the field spreads",
          "Store every variant forever in case a model needs it",
          "Skip documentation until the dashboard is popular",
        ],
        "answerIndex": 1,
        "explain": "The map’s value is the set of decisions it makes visible early: purpose, custody, and end-of-life.",
      },
      {
        "q": "Which pattern matches how public lifecycle models describe real projects?",
        "choices": [
          "A single straight sequence with no return paths",
          "Stages that can loop, overlap, or be revisited when reuse or analysis demands it",
          "Only two states: raw and deleted",
          "A vendor contract term measured in years",
        ],
        "answerIndex": 1,
        "explain": "UW–Madison, NIST RDaF, and USGS materials all treat lifecycles as cyclical planning tools, not rigid pipelines.",
      },
    ],
  },
  "lc-compare": {
    "concept": """Three public models teach the same instinct with different labels. UW–Madison’s data-literacy lifecycle walks Plan, Create, Manage, Use, Share, Collect/Reuse, and Destroy, and it keeps management activities running continuously. NIST RDaF Version 2.0 organizes research data work into six stages: Envision, Plan, Generate/Acquire, Process/Analyze, Share/Use/Reuse, and Preserve/Discard. The USGS Science Data Lifecycle Model uses Plan, Acquire, Process, Analyze, Preserve, and Publish/Share, with cross-cuts for describing data, managing quality, and backup and security.

Harvard’s privacy-oriented guide compresses the same arc into Plan, Create/Collect, Store, Use, Share, and Archive/Destroy, with minimization and protection in every step. None of these pages is a law. They are shared vocabulary so a research office, a retailer, and a platform team can translate one another.

The skill is translation, not loyalty to one poster. If a scientist says “Preserve/Discard” and a privacy partner says “Archive/Destroy,” they are pointing at the same fork: keep it readable for a reason, or remove it on purpose.""",
    "howItWorks": """1. Lay the models in columns and align stages by intent, not by identical words.
2. Mark where a model splits one idea (USGS separates Process and Analyze; others fold them into use).
3. Mark where a model adds an early stage (RDaF’s Envision) that others fold into Plan.
4. Note cross-cuts that USGS states explicitly and that the others imply: describe, quality, secure.
5. Pick one house spine for teaching, and keep a one-page translation for partners who use another dialect.""",
    "example": """A university lab and Northline’s analytics team both study textile durability. The lab’s data plan follows RDaF: Envision the question, then Generate/Acquire lab measurements. Northline’s merchant team uses Plan → Create → Store. In a joint review they map RDaF “Preserve/Discard” to Northline’s “Archive or Destroy” and agree the shared risk is the same: undocumented copies after the study ends. The translation takes a page, not a new framework.""",
    "pitfalls": [
      "Arguing about stage names while the data still has no owner or retention rule.",
      "Importing every stage from every model into one 20-step process nobody can remember.",
      "Ignoring cross-cuts because they are drawn beside the arrows instead of on them.",
      "Treating a research framework as if it automatically satisfied a retailer’s customer-data duties, or the reverse.",
    ],
    "checklist": [
      "You can name the six RDaF stages without reading them off a slide.",
      "You can place USGS Preserve and Publish/Share against archive, share, and destroy.",
      "Your house model has a written translation to at least one public model.",
      "Cross-cutting describe, quality, and security work is visible, not implied.",
      "Partners can find the translation without asking you to redraw it in a meeting.",
    ],
    "seeAlso": ["lc-unified", "lc-why", "qm-fair-depth"],
    "extraQuiz": [
      {
        "q": "USGS adds explicit cross-cutting activities beside its stages. Those cross-cuts include:",
        "choices": [
          "Describe, manage quality, and backup & secure",
          "Only hiring and payroll",
          "Sprint planning and retrospectives",
          "Font licensing and brand color",
        ],
        "answerIndex": 0,
        "explain": "The USGS science data lifecycle pairs its stages with describe, quality, and backup/security work that continues across them.",
      },
      {
        "q": "When two teams use different stage names, the useful first move is to:",
        "choices": [
          "Force both teams onto a vendor’s proprietary labels",
          "Align the stages by what each one is trying to accomplish",
          "Discard both models and invent private slang",
          "Skip planning until the names match exactly",
        ],
        "answerIndex": 1,
        "explain": "Translation by intent is the point of comparing public models.",
      },
    ],
  },
  "lc-unified": {
    "concept": """Data Lens teaches one spine so later tracks have a place to hang governance, quality, and master data: Plan → Create/Acquire → Store/Manage → Use/Process → Share → Archive → Destroy. The seven names are a learner’s compression of the public models, not a claim that any one institution uses exactly these seven boxes.

Plan decides purpose, roles, classification, and retention. Create/Acquire brings data in under those rules. Store/Manage is custody: location, backup, access, and day-to-day care. Use/Process turns data into something a decision can lean on, without losing the trail. Share grants access on purpose. Archive keeps what still has a reason to exist. Destroy removes what no longer does.

Three cross-cuts run under every box. Quality asks whether the data is fit for the decision. Security and privacy ask who may see it and why. Metadata and lineage ask how a later person will know what the field means and where it came from. If a stage has no answer on those three, the stage is not finished.""",
    "howItWorks": """1. Draw the seven stages in order and add dashed return arrows for reuse (share back to create) and for iterative analysis (use back to use).
2. Under the row, draw three bands: quality, security/privacy, metadata/lineage.
3. For a real asset, write one sentence in each stage and one sentence in each band.
4. Circle the stage where the asset actually is today, which is often Store or Use while Plan was never written.
5. Use the empty sentences as the backlog, not as a new committee.""",
    "example": """For the Harbor Beanie, SKU NL-HAT-204, Plan says the item exists to be sold in web and stores for one season, with fiber content required before any channel can publish. Create is the PIM draft plus the mill’s composition sheet. Store is the PIM, not a buyer’s desktop file. Use is the enrichment and price rules. Share is the publish job to ecommerce and POS. Archive is the retired-but-warrantied record. Destroy is the working photos and draft spreadsheets after retention, not the legal sales history. Quality, access, and a style definition apply in all seven.""",
    "pitfalls": [
      "Memorizing the seven names and never writing them against an actual customer or product.",
      "Collapsing Archive and Destroy into “we’ll clean up later.”",
      "Letting a cross-cut live only in a security team’s backlog while product data ships anyway.",
      "Adding an eighth stage every time a tool is purchased.",
    ],
    "checklist": [
      "You can place a current project on one primary stage and name the loop it is in.",
      "Each stage has an owner or a clear handoff.",
      "Quality, protection, and metadata have a concrete task in the current stage.",
      "Archive and destroy are separate decisions with separate evidence.",
      "The spine is the one your lessons, journey, and cases all use, so vocabulary stays stable.",
    ],
    "seeAlso": ["lc-plan", "lc-archive-destroy", "gov-policies"],
    "extraQuiz": [
      {
        "q": "In the Data Lens spine, Share differs from Use/Process because Share is about:",
        "choices": [
          "Cleaning values inside a pipeline",
          "Intentionally granting access or publishing under rules",
          "Buying more disk",
          "Deleting backups",
        ],
        "answerIndex": 1,
        "explain": "Use/Process transforms data for a decision. Share moves it to other people or systems under constraints.",
      },
      {
        "q": "A stage is incomplete on this model when:",
        "choices": [
          "The team has not yet picked a font for the dashboard",
          "Quality, protection, or lineage has no answer for that stage",
          "More than two people can see the data",
          "The data is stored in a database rather than a file",
        ],
        "answerIndex": 1,
        "explain": "Cross-cuts are part of every stage, not optional decoration.",
      },
    ],
  },
  "lc-plan": {
    "concept": """Planning is the cheapest place to prevent a data incident. Before rows exist, you decide the purpose, the smallest set of fields that serves it, who is accountable, how sensitive the data is, which system is allowed to hold it, and how long it may live. Harvard’s lifecycle guidance and UW–Madison’s literacy materials both put this work first because collection is hard to unwind.

A short data management plan beats a novel nobody reads. It names the questions the data will answer, the owner who can approve access and retention, the classification, the formats you will accept, and the sharing rules. It also names what you will not collect. Minimization is a planning decision, not a speech you give after the warehouse is full.

Planning is also where reference data and master data get invited. If color must be a controlled list, that list needs an owner before the first style sheet arrives. If two systems will both create customers, the match rules belong in the plan, not in next year’s cleanup.""",
    "howItWorks": """1. Write the decision the data must support and the people who make it.
2. List required fields and explicitly rejected fields.
3. Name a data owner and the steward who will keep definitions honest.
4. Classify sensitivity and pick approved stores for that class.
5. Set retention, archive, and destruction expectations, including partner copies.
6. Note quality bars for the critical fields (required fiber content, valid email, and so on).
7. Review the page with security or counsel when personal data or contracts are in scope—this site is not that review.""",
    "example": """Before the loyalty form ships, the customer owner writes a one-page plan: purpose is order status and opted-in offers; fields are name, email, ship-to, and consent timestamp; payment numbers stay in the payments vault, not the customer master; retention is active life plus 24 months; email completeness must be at least 98 percent of new accounts. The product owner’s plan for NL-HAT-204 lists fiber, care, and size run as publish-blocking attributes. Both plans are linked from the launch ticket.""",
    "pitfalls": [
      "Starting with a tool demo and hoping purpose shows up later.",
      "Collecting “just in case” attributes with no decision attached.",
      "Naming a committee as the owner so no single person can approve an exception.",
      "Leaving retention as “follow policy” when nobody can find the schedule.",
      "Planning the production table and forgetting the spreadsheet that will actually be used on day one.",
    ],
    "checklist": [
      "Purpose, non-goals, and required fields fit on one page.",
      "An owner is named for the domain.",
      "Classification and approved systems are written down.",
      "Retention and destruction are specific enough to automate later.",
      "Critical fields have a first quality bar.",
      "Counsel or security is engaged where personal or contractual data is involved.",
    ],
    "seeAlso": ["roles-trio", "gov-policies", "mdm-master"],
    "extraQuiz": [
      {
        "q": "Minimization belongs in planning because:",
        "choices": [
          "Empty databases are easier to brand",
          "Data you never collect cannot be breached, misused, or retained by mistake",
          "Standards forbid all customer attributes",
          "Stewards prefer blank forms",
        ],
        "answerIndex": 1,
        "explain": "The smallest useful set is chosen before capture, when saying no is still cheap.",
      },
      {
        "q": "A useful planning output for a new product attribute is:",
        "choices": [
          "A named owner, a required-or-not flag, and a retention note",
          "A new logo",
          "An unowned column added in three systems the same afternoon",
          "A verbal agreement that someone will document it someday",
        ],
        "answerIndex": 0,
        "explain": "Planning turns an idea into an accountable, classifiable, expiring attribute.",
      },
    ],
  },
  "lc-create": {
    "concept": """Create and acquire is the moment data enters the organization: a form post, a mill’s spreadsheet, a sensor file, a purchased list, a partner feed, or a computed feature. The stage is successful when the new data arrives with enough context to be used safely and with agreements that match the plan. USGS calls the parallel idea Acquire; NIST RDaF calls it Generate/Acquire. The work is the same: get the facts in without smuggling in ambiguity.

Context is part of the payload. Units, timestamps, collection method, consent state, and the version of the code list all travel with the values. A fiber percentage without a test method, or an email without a consent timestamp, is a future argument.

Transfer paths matter as much as fields. Approved channels, encryption in transit where the classification calls for it, and a habit of not spawning extra copies keep the acquire stage from quietly becoming an unowned store.""",
    "howItWorks": """1. Confirm the source is allowed by the plan and by any contract or consent.
2. Capture required context at the boundary: who, when, method, units, code-list version.
3. Validate against reference data on the way in (color, country, currency, size).
4. Land the payload in the system of record, not in an inbox.
5. Record lineage: source system, file or API name, and the job that loaded it.
6. Delete or lock the transport copy once the load is confirmed.""",
    "example": """The mill sends a composition sheet for the Harbor Beanie. The acquire job rejects “wool blend” because the standard requires a percentage, and it rejects color “charcol” because the reference list only contains Charcoal. The buyer corrects the sheet; the PIM stores fiber as “100% merino wool,” color Charcoal, and a source note pointing at the mill file version. The email attachment is deleted after the load receipt is checked. Separately, Maya Chen’s signup form stores consent time and the privacy-notice version next to her email.""",
    "pitfalls": [
      "Accepting free text for values that already have a controlled list.",
      "Loading a purchased file before anyone reads the permitted-use clause.",
      "Leaving the “real” data in the inbox that performed the transfer.",
      "Capturing identifiers you cannot explain, because the form library made them easy.",
      "Overwriting a good record with a sparse acquire because the job matches on a weak key.",
    ],
    "checklist": [
      "The source and the permitted use are identified.",
      "Required context fields are present, not reconstructed a month later.",
      "Reference values are validated at the boundary.",
      "The system of record, not a transport file, holds the authoritative row.",
      "A lineage note links the row to the source drop.",
      "Transport copies have a deletion step.",
    ],
    "seeAlso": ["mdm-reference", "qm-dimensions", "dama-security"],
    "extraQuiz": [
      {
        "q": "Which acquire outcome best matches the plan-first habit?",
        "choices": [
          "Store the attachment and decide the meaning during the annual audit",
          "Reject values that break the code list or the required format, and keep a source note on what loaded",
          "Add every column in the partner file so nothing is lost",
          "Email the file to the team and let each person keep a copy",
        ],
        "answerIndex": 1,
        "explain": "Acquisition is the moment to enforce the standards the plan already named.",
      },
      {
        "q": "Context captured at creation usually includes things like:",
        "choices": [
          "Only the raw number, with units implied by tribal knowledge",
          "Units, time, method, and the version of any code list used",
          "The engineer’s favorite editor",
          "A second copy of the same file on a laptop",
        ],
        "answerIndex": 1,
        "explain": "Later stages cannot invent missing context honestly.",
      },
    ],
  },
  "lc-store": {
    "concept": """Storage is custody, not a pile of disks. Once data has arrived, someone has to keep it in a place approved for its classification, protect it at rest, back it up, prove a restore, control who can log in, and notice when the job fails. Harvard’s lifecycle materials put encryption, access control, and backup in this part of the arc. USGS treats backup and security as a cross-cut because custody never really turns off.

The system of record is a decision. Product facts live in the PIM. Customer profile facts live in the customer master. Payment credentials live in a vault built for them. Analytics copies are downstream. When a spreadsheet becomes more trusted than the system of record, storage has failed even if the disks are healthy.

Custodians usually run these controls. Owners and stewards set the requirements: classification, retention, who may have access, and which copy is allowed to answer a question. Small teams combine the people. They should not combine the ideas.""",
    "howItWorks": """1. Name the system of record for each data domain and ban rival “final” copies.
2. Place the data only in locations approved for its classification.
3. Apply encryption at rest and key handling when policy requires it.
4. Back up on a schedule and test a restore on a schedule, not only after an outage.
5. Grant access through named roles; review it when people change jobs.
6. Remove working copies after a successful load.
7. Monitor freshness, job failure, and capacity so “stored” does not become “silently stale.”""",
    "example": """NL-HAT-204’s price is edited in the PIM. A channel export is generated each hour and is labeled as a copy. A merchant’s desktop file from last Tuesday still says $42; the PIM says $48. The team deletes the desktop file and turns off a shared drive folder that had been treated as editable. Backups of the PIM are restored into a drill environment once a quarter. Customer records sit in the CRM with disk encryption; the payments token never lands in that database.""",
    "pitfalls": [
      "Calling every copy authoritative because it is easier than integrating.",
      "Backing up faithfully and never testing a restore.",
      "Keeping every working file “until the project ends,” which is never.",
      "Granting standing admin access to analysts because tickets feel slow.",
      "Storing a higher classification of data in a tool that was approved only for public content.",
    ],
    "checklist": [
      "Each domain has one named system of record.",
      "The store matches the classification.",
      "Restore tests have a date and a result.",
      "Working copies have an owner and a deletion point.",
      "Access is named, role-based, and reviewable.",
      "Monitoring catches failed loads before a business user does.",
    ],
    "seeAlso": ["dama-storage", "dama-security", "roles-trio"],
    "extraQuiz": [
      {
        "q": "A restore test belongs in Store/Manage because:",
        "choices": [
          "Backups that cannot be restored are not protection",
          "Tests replace the need for access control",
          "Disks are infinite",
          "Owners personally run every backup",
        ],
        "answerIndex": 0,
        "explain": "Custody includes proving you can get the data back, not only that a job wrote a file.",
      },
      {
        "q": "When a spreadsheet and the PIM disagree, the storage design should already say:",
        "choices": [
          "Whichever file was emailed last wins",
          "Which system is the system of record",
          "Both are equally official",
          "The disagreement is a branding issue",
        ],
        "answerIndex": 1,
        "explain": "Naming the system of record is how custody stays decidable.",
      },
    ],
  },
  "lc-use": {
    "concept": """Use and process is where data earns its keep: cleaning, conforming, enriching, analyzing, and deciding. NIST RDaF groups much of this as Process/Analyze. The obligation that rides along is traceability. A number on a slide is only as trustworthy as the steps a stranger could replay.

Processing is also where purpose can quietly expand. A customer email collected for order status is a weak excuse for an unrelated model. Purpose limitation, taught in public privacy principles such as GDPR Article 5, is a use-stage discipline: if the new use is incompatible, it needs its own decision, not a convenient column. This course states the idea; it does not give legal advice.

Quality checks belong in the pipeline, not as a surprise in the executive review. If fiber content is required to publish, the enrichment workflow blocks the publish. If two sources disagree on a customer’s legal name, the use stage routes the conflict to a steward instead of averaging the letters.""",
    "howItWorks": """1. State the question or product the processing serves.
2. Prefer versioned pipelines over one-off desktop edits.
3. Record transformations: inputs, rules, code or job version, and who approved a manual override.
4. Run quality rules on critical fields before the result is treated as certified.
5. Check that the use still matches the purpose and the classification.
6. Separate exploratory sandboxes from certified outputs so a draft metric cannot be quoted as official.""",
    "example": """Merchandising asks which sizes of the Harbor Beanie to reorder. The pipeline joins PIM attributes to sales facts, documents the filter (first four weeks, web plus stores), and refuses styles whose fiber field is null. Separately, a match job proposes that Maya Chen’s web profile and a store card are the same person. The scores are high on email and low on address. The use stage does not auto-merge. It opens a steward task. The reorder metric ships; the identity decision waits for a person.""",
    "pitfalls": [
      "Editing a certified extract in a spreadsheet and pasting the result back as truth.",
      "Training or targeting on data collected for a narrower purpose without a new decision.",
      "Hiding failed quality checks so a launch date survives.",
      "Auto-merging identities because a job can, not because a rule says it is safe.",
      "Losing the job version, so nobody can explain last Thursday’s number.",
    ],
    "checklist": [
      "The processing purpose is written next to the job.",
      "Transforms are versioned and replayable.",
      "Critical quality rules block or flag before certification.",
      "Manual overrides have a name and a reason.",
      "Sandbox outputs are visibly distinct from certified ones.",
      "Identity and attribute conflicts route to stewards when rules are unsure.",
    ],
    "seeAlso": ["qm-measure", "mdm-match-merge", "dama-dwbi"],
    "extraQuiz": [
      {
        "q": "A certified metric and a sandbox exploration should be separated so that:",
        "choices": [
          "Nobody can analyze data",
          "Draft numbers are not quoted as the official result",
          "Sandboxes can skip all access control",
          "Only executives may use spreadsheets",
        ],
        "answerIndex": 1,
        "explain": "Use/Process includes knowing which outputs are allowed to drive a decision.",
      },
      {
        "q": "Traceability during processing means a later reader can see:",
        "choices": [
          "Only the final chart title",
          "Inputs, transformation rules, and job or code version",
          "The analyst’s calendar",
          "Nothing, if the chart looks polished",
        ],
        "answerIndex": 1,
        "explain": "Trust comes from a replayable path, which public lifecycle guides treat as part of responsible use.",
      },
    ],
  },
  "lc-share": {
    "concept": """Sharing is any intentional release of data to another person or system: a teammate’s access grant, a nightly feed to a marketplace, a research dataset with a DOI, or a report subscription. Good sharing is specific about who, which fields, which purpose, and for how long. Broad links and shared passwords feel fast and fail the stage.

Least privilege is the default shape. Named people or named service accounts get the minimum role, and the grant expires or is reviewed. Sensitive data may need a controlled repository rather than an open one. FAIR principles, published by the GO FAIR Foundation, add a research-facing version of the same care: be findable and accessible, including with authentication where open access is wrong, and describe the data so reuse is honest.

Curation is part of sharing. A feed of half-finished product attributes is not “transparent”; it is a way to publish defects. The share stage consumes the quality bar from earlier stages and refuses to ship what does not pass.""",
    "howItWorks": """1. Name the consumer, the purpose, and the field list. Cut fields that fail the purpose test.
2. Choose the channel: governed API or export, not an ad-hoc attachment, for anything sensitive or operational.
3. Authenticate the consumer and grant the smallest role that works.
4. Attach the terms: license, contract, or internal acceptable-use rule.
5. Ship metadata with the data: definitions, freshness, and known limits.
6. Revoke or expire access when the purpose ends, and include partner copies in that review.""",
    "example": """The Harbor Beanie is ready to sell. Ecommerce and the point-of-sale system receive the certified attribute set through versioned feeds. A marketplace receives title, price, color, and fiber, not the internal cost or the mill contact. Marketing receives Maya’s email only because her consent flag is true, and the segment job cannot select payment tokens because those tokens are not in the customer master. Access for a seasonal contractor expires the week the campaign ends.""",
    "pitfalls": [
      "Publishing a public link because setting up accounts takes an afternoon.",
      "Sharing the whole table when the consumer needed four columns.",
      "Letting a feed keep running after the contract or the campaign ends.",
      "Shipping undocumented fields and calling the dump “self-service.”",
      "Assuming a research ideal of openness applies unchanged to customer or cost data.",
    ],
    "checklist": [
      "Consumer, purpose, and field list are written down.",
      "The channel authenticates people or services.",
      "Terms or a license travel with external shares.",
      "Metadata is sufficient for the consumer to judge fitness.",
      "Grants expire or are reviewed.",
      "The quality gate can block a share.",
    ],
    "seeAlso": ["dama-integration", "qm-fair-depth", "gov-decision-rights"],
    "extraQuiz": [
      {
        "q": "A marketplace feed for a product should typically include:",
        "choices": [
          "Every internal column, including cost and buyer notes",
          "The certified public attributes the contract allows",
          "The full customer master, for personalization by the marketplace",
          "Shared administrator passwords for speed",
        ],
        "answerIndex": 1,
        "explain": "Sharing is a field-level, purpose-level decision.",
      },
      {
        "q": "FAIR accessibility still allows:",
        "choices": [
          "Authentication and authorization when data cannot be fully open",
          "Only anonymous FTP of all files",
          "Hiding the metadata if the data is restricted",
          "Shared team passwords as a standard protocol",
        ],
        "answerIndex": 0,
        "explain": "The FAIR principles explicitly allow access controls; metadata may remain available even when data is not.",
      },
    ],
  },
  "lc-archive-destroy": {
    "concept": """End of use is a decision with two different outcomes. Archive keeps selected data in a durable, documented form because a legal, scientific, or business reason remains. Destroy removes data that should no longer exist, across the systems and copies the policy covers. NIST RDaF names the fork Preserve/Discard. Harvard’s guide names it Archive/Destroy. Both insist the fork is deliberate.

Archiving fails when the file is merely old. A real archive is readable later: stable formats, metadata, identifiers, and a way to know the retention clock and any hold. Destroying fails when only the convenient copy is deleted and the campaign extract, the laptop, and the backup cycle still carry the data. Evidence matters in both cases: what was kept or removed, under which rule, and by whom.

Not everything ends together. A retired SKU can be archived for warranty and tax while draft images are destroyed. A closed loyalty profile can lose marketing attributes on one clock and keep order facts on another. Selective end-of-life is a sign the plan was real.""",
    "howItWorks": """1. Read the retention schedule and any legal hold before touching the data.
2. Split the asset into what must remain and what must go.
3. For the archive path, move to durable storage, verify readability, and keep metadata and identifiers.
4. For the destroy path, delete from the system of record, working copies, partner feeds you control, and backups according to the backup policy.
5. Record the action: rule, scope, actor, and time.
6. Confirm downstream consumers stop expecting a destroyed feed.""",
    "example": """The Harbor Beanie leaves the assortment. Status becomes Retired. The PIM master, with fiber and the history of published prices, moves to an archive partition kept for warranty and reporting. Superseded studio selects and the buyer’s draft workbook are destroyed, and the destruction is logged. Maya closes her account the same month. Marketing attributes are destroyed after the stated window. Order lines stay until the finance clock ends, then follow their own destruction job. A hold would have stopped either destruction; there is no hold.""",
    "pitfalls": [
      "Keeping everything forever because deletion feels risky.",
      "Deleting the system of record and forgetting extracts and backups.",
      "Archiving in a format only one retired tool can open.",
      "Destroying a record that is under a legal hold because the job is automatic and the hold flag is ignored.",
      "Leaving a published feed live after the archive decision, so partners keep refreshing a dead product as if it were current.",
    ],
    "checklist": [
      "Retention and hold status are checked before action.",
      "Archive and destroy are chosen per data class, not as one blunt switch.",
      "Archived data has metadata and a readable format.",
      "Destruction scope lists primary store, copies, and relevant backups.",
      "A log records rule, actor, and time.",
      "Consumers of the data are told or technically cut off.",
    ],
    "seeAlso": ["gov-risk", "roles-raci", "mdm-ops"],
    "extraQuiz": [
      {
        "q": "A retired product that must remain available for warranty claims should be:",
        "choices": [
          "Destroyed the day it leaves the website",
          "Archived in a durable, documented form until its retention clock ends",
          "Left editable in the live PIM with no status change",
          "Emailed to whoever asks, with no log",
        ],
        "answerIndex": 1,
        "explain": "Archive is the end-of-use path for data that still has a reason to exist.",
      },
      {
        "q": "Secure destruction is incomplete if:",
        "choices": [
          "Only the primary record is removed and known extracts remain in circulation",
          "A log is written",
          "The retention schedule was consulted",
          "Metadata describes what was removed",
        ],
        "answerIndex": 0,
        "explain": "End-of-life applies to the copies the policy covers, not only the row that is easiest to see.",
      },
    ],
  },
  "gov-intro": {
    "concept": """Data governance is the system of decision rights, policies, accountability, and oversight an organization uses so data is managed as an asset rather than as a side effect of projects. It answers who may decide, by which rules, and how the rest of the organization can see that the decision was made. Public descriptions of the DAMA-DMBOK wheel put governance at the center for this reason: other disciplines drift when nobody can settle a conflict.

Governance is not a tool, a glossary project, or a synonym for the legal department. Tools implement decisions. Glossaries record them. Counsel interprets obligations. Governance is the operating structure that connects those pieces to business owners. It is also not day-to-day pipeline work, though it sets the rules that pipeline work must respect.

This course teaches the shape of that structure. It is not legal advice, and it does not certify an organization against any framework. Where a decision has regulatory weight, the governance system should know which specialist to bring in rather than pretending a steering slide is the specialist.""",
    "howItWorks": """1. Name the decisions that must not be made differently in every team: definitions, access, quality bars, retention, master-data changes.
2. Assign accountability for each decision to a role a person can actually hold.
3. Write the small set of policies those people will enforce.
4. Give them a forum for cross-team conflicts and a cadence so the forum meets before the crisis.
5. Record decisions where newcomers can find them.
6. Watch a few outcomes (incidents, reconciliation time, owner coverage) to see whether the structure is real.""",
    "example": """Two Northline teams define “active customer” differently, so the board pack and the store report disagree by 12 percent. Governance does not start by buying a catalog. The customer owner is made accountable for the definition, a steward drafts it, the council adopts it, and both reports are required to use the certified metric. The disagreement becomes a decision with a date instead of a recurring argument.""",
    "pitfalls": [
      "Equating governance with a software purchase.",
      "Writing principles nobody can use to approve or deny a request.",
      "Letting every domain invent policy and calling the result “federated” without a place to resolve collisions.",
      "Hiding governance inside a legal or IT team so business owners never become accountable.",
    ],
    "checklist": [
      "You can state what governance decides in your organization, in a few sentences.",
      "Decision rights name roles, not vague groups.",
      "Policies exist for the decisions you listed, even if they are short.",
      "There is a forum and a cadence.",
      "Decisions are recorded.",
      "The program can point to an outcome, not only to a charter.",
    ],
    "seeAlso": ["dama-gov", "gov-decision-rights", "roles-council-cdo"],
    "extraQuiz": [
      {
        "q": "Which task is governance, rather than a neighboring discipline?",
        "choices": [
          "Tuning a warehouse partition",
          "Deciding who may approve a shared definition and how exceptions escalate",
          "Writing a CSS theme",
          "Replacing all stewardship with a script",
        ],
        "answerIndex": 1,
        "explain": "Governance sets decision rights and escalation. Implementation work sits in other disciplines.",
      },
      {
        "q": "A glossary without decision rights usually becomes:",
        "choices": [
          "A list of competing definitions with no way to pick a winner",
          "A complete control framework",
          "A substitute for retention schedules",
          "Proof that no owner is required",
        ],
        "answerIndex": 0,
        "explain": "Recording words is useful only when someone is accountable for which words are official.",
      },
    ],
  },
  "gov-decision-rights": {
    "concept": """Decision rights say which role may approve which kind of choice. Access to a customer attribute, the official definition of revenue, the quality threshold for a product feed, a retention exception, a survivorship rule: each is a decision that will otherwise be relitigated in chat. Rights make the next request boring, which is what you want.

Accountability and responsibility are different. The accountable role owns the outcome and can say yes or no. Responsible roles do the work. Consulted roles bring expertise before the decision. Informed roles hear the result. RACI is a simple way to write this down. A healthy matrix has one accountable role for a given outcome so ownership does not dissolve into a mailing list.

Domain owners typically hold accountability for their subject area. Stewards prepare the analysis and operate the standard. Custodians implement technical controls. Cross-domain collisions—a product hierarchy that breaks a finance report, a customer field the website and the warehouse both think they own—escalate to a council because no single domain owner can settle them alone.""",
    "howItWorks": """1. List recurring decisions, not job descriptions.
2. For each decision, mark one Accountable role and the Responsible people who prepare or execute it.
3. Mark who must be Consulted beforehand and who is Informed after.
4. Write the escalation path when two accountable owners disagree.
5. Publish the matrix next to the request process.
6. Change the matrix when the org chart or the platform changes, not only when a crisis forces it.""",
    "example": """Retiring the attribute legacy_loyalty_tier is a decision. The customer owner is Accountable. The steward is Responsible for impact analysis, glossary updates, and the change ticket. The custodian is Consulted on which tables hold the column and then carries out the technical drop under that ticket. The CDO is Informed because the change is local, not a new enterprise policy. A downstream marketing lead who wants an exception asks the owner, not the database administrator.""",
    "pitfalls": [
      "Giving everyone Accountable status so the matrix looks inclusive and decides nothing.",
      "Letting the person with production access become the de facto approver.",
      "Writing RACI in a slide deck that the ticketing workflow does not mention.",
      "Escalating every small change to the council and starving it of real conflicts.",
      "Forgetting to name who may grant an exception, so exceptions happen in side channels.",
    ],
    "checklist": [
      "Recurring data decisions are listed.",
      "Each has one accountable role.",
      "Responsible, consulted, and informed roles are named.",
      "Escalation is a path, not a hope.",
      "The request process points at the matrix.",
      "Exception authority is explicit.",
    ],
    "seeAlso": ["roles-raci", "roles-trio", "gov-councils"],
    "extraQuiz": [
      {
        "q": "Two domain owners disagree about a shared customer identifier. The decision rights design should:",
        "choices": [
          "Let the faster team change the identifier in production",
          "Escalate to the cross-domain forum identified in advance",
          "Ask a vendor to vote",
          "Freeze all analytics permanently",
        ],
        "answerIndex": 1,
        "explain": "Cross-domain conflicts need a named path above any single owner.",
      },
      {
        "q": "Separating accountability from responsibility helps because:",
        "choices": [
          "The person who does the work and the person who owns the outcome can be different without confusion",
          "Nobody has to approve anything",
          "Custodians set business policy by default",
          "RACI forbids documentation",
        ],
        "answerIndex": 0,
        "explain": "The split keeps execution and ownership visible at the same time.",
      },
    ],
  },
  "gov-policies": {
    "concept": """Policies, standards, and procedures are three altitudes of the same intent. A policy states what must be true and what is prohibited: classify data, limit use to the purpose, keep it only as long as the schedule allows, expect critical fields to meet a quality bar. A standard makes that intent measurable: required metadata fields, naming rules, approved code lists, encryption expectations for a given class. A procedure shows the steps a person or a job follows so the standard actually happens.

Public privacy principles such as those summarized from GDPR Article 5—lawfulness and transparency, purpose limitation, minimization, accuracy, storage limitation, integrity and confidentiality, accountability—often shape policy language. They are inputs to a conversation with counsel, not a substitute for one. This module teaches the layering. It does not interpret the law for your situation.

A short policy set that people use beats a long binder that people route around. Start with classification, access, quality expectations, retention, and acceptable use. Add more when a real decision is being made inconsistently, not when a template has a blank chapter.""",
    "howItWorks": """1. Write policies as decisions a manager can apply: approve, deny, or escalate.
2. Under each policy, list the standards that make compliance testable.
3. Point each standard at a procedure or automated control: a ticket type, a pipeline check, a review.
4. Name the owner of the policy and the review cadence.
5. Retire stale rules. A policy that contradicts the way the system works will be ignored, and then every policy will be.
6. Keep a change log so teams can see what shifted since last quarter.""",
    "example": """Northline’s product-content policy says sellable items must publish only certified attributes. The standard lists the blocking fields: name, size run, color from the reference list, fiber percentage, price, and care. The procedure is the PIM workflow: a steward completes enrichment, a rule blocks publish when a blocking field is null or invalid, and a channel feed reads only the certified flag. The policy is two paragraphs. The standard is a table. The procedure is the workflow people already open.""",
    "pitfalls": [
      "Writing policy in language that cannot be turned into a yes or no.",
      "Maintaining standards in a document the pipelines do not read.",
      "Copying another company’s entire policy pack without an owner for each section.",
      "Never reviewing, so the document describes a system you decommissioned.",
      "Treating a privacy principle summary as if reading it were legal clearance.",
    ],
    "checklist": [
      "Core policies exist for classification, access, quality, retention, and acceptable use.",
      "Each policy has an owner and a review date.",
      "Standards are specific enough to test.",
      "Procedures or automated checks implement the standards.",
      "Stale rules are removed or marked replaced.",
      "Regulatory language is reviewed by the right specialists before it is treated as binding.",
    ],
    "seeAlso": ["gov-risk", "qm-measure", "lc-plan"],
    "extraQuiz": [
      {
        "q": "A standard differs from a policy because a standard:",
        "choices": [
          "Is a measurable convention someone can check",
          "Replaces the need for any procedure",
          "Is always a law",
          "Exists only in a slide title",
        ],
        "answerIndex": 0,
        "explain": "Policy sets intent. Standards make that intent testable.",
      },
      {
        "q": "Purpose limitation shows up in an internal policy as a rule like:",
        "choices": [
          "Any team may reuse personal data for a new purpose without review",
          "A new use needs a decision when it does not fit the purpose already recorded",
          "Personal data should be collected with no stated purpose",
          "Retention is optional if the data is interesting",
        ],
        "answerIndex": 1,
        "explain": "The principle becomes operational when a new use must be explicitly decided.",
      },
    ],
  },
  "gov-councils": {
    "concept": """A governance council is the forum that can make a cross-team data decision stick. It approves shared standards, settles conflicts between domain owners, and sets priority when not every data problem can be funded. It is not a replacement for domain owners, and it is not a status meeting that rubber-stamps a slide.

Sponsorship is what keeps the forum from becoming theater. An executive sponsor, often alongside a chief data officer or equivalent lead, funds the work, removes blockers, and signals that showing up is part of the job. Authority without subject-matter expertise produces vague mandates. Expertise without authority produces excellent recommendations that expire in a backlog.

Operating models vary. A common shape is a thin center—council, CDO office, a small center of excellence—plus federated stewards who stay inside the domains. Working groups do the deep dives: glossary, quality rules, a master-data policy. They bring proposals up. They do not become a second, shadow council. Start with a few critical domains. A program that tries to govern every knowledge area in month one usually governs none of them.""",
    "howItWorks": """1. Charter the council: membership, decisions it owns, decisions it does not own, and cadence.
2. Seat domain owners, not only support functions, so the people affected are in the room.
3. Require proposals to arrive with options, a recommendation, and the dissent.
4. Record the decision, the owner, and the review date in a log teams can find.
5. Fund a short list of domains and standards rather than a universal transformation.
6. Use working groups for detail and close them when the decision is made.""",
    "example": """Northline’s council meets monthly for 90 minutes. This month’s decision is whether color may be free text in the marketplace feed. Product, digital, and finance are present. The working group shows that free text breaks the quality rule and the search filters. The council adopts the reference list as a standard and asks the custodian for a date when nonconforming feeds will be rejected. The decision log gains one row. A separate discussion about office snacks is not on the agenda.""",
    "pitfalls": [
      "A council of delegates who cannot commit their teams.",
      "No sponsor, so priority always loses to the next feature launch.",
      "Agenda filled with updates, leaving no time for a decision.",
      "Boiling the ocean across every data domain and every knowledge area at once.",
      "Keeping no log, so the same debate returns next quarter as if it were new.",
    ],
    "checklist": [
      "The charter lists decisions the council actually makes.",
      "Members can commit for their domains.",
      "A sponsor is visible and funded the current slate.",
      "Working groups have a scope and an end.",
      "A decision log exists and is used.",
      "The first slate of domains is small enough to finish.",
    ],
    "seeAlso": ["roles-council-cdo", "gov-metrics", "gov-decision-rights"],
    "extraQuiz": [
      {
        "q": "Federated stewards plus a small center of excellence is meant to:",
        "choices": [
          "Remove all local knowledge",
          "Keep domain expertise close to the data while sharing standards across domains",
          "Replace the council with a chat channel",
          "Avoid naming any owner",
        ],
        "answerIndex": 1,
        "explain": "The pattern balances local knowledge with enterprise consistency.",
      },
      {
        "q": "A council agenda that never records a decision is a sign that:",
        "choices": [
          "The forum is informing people but not governing",
          "Governance is complete",
          "Working groups are unnecessary",
          "Sponsorship is too strong",
        ],
        "answerIndex": 0,
        "explain": "Governance forums exist to decide and to log those decisions.",
      },
    ],
  },
  "gov-metrics": {
    "concept": """Governance earns the right to continue when it changes outcomes people already care about: fewer reconciling arguments, faster trusted reports, fewer access incidents, cleaner regulatory extracts, a customer who can be reached because the email is real. Vanity counts—slides produced, meetings held—do not earn that right.

Use both leading and lagging signals. Leading signals show the system is being built: domains with a named owner, critical fields with a definition, access reviews completed on time. Lagging signals show it mattered: incident counts, days to close a quality issue, duplicate rate on a master entity, audit findings. DCAM, the EDM Association’s capability assessment model, is one public way organizations talk about assessing these capabilities and sequencing gaps. Some programs also borrow maturity levels in a CMMI-like spirit. The label matters less than whether the score changes what you fund.

Metric theater is a known failure. If a KPI never changes a decision, drop it or redesign it. Revisit the set when the program grows. A beginner program needs owner coverage. A later program needs time-to-publish and exception aging. Maturity is a sequence, not a trophy.""",
    "howItWorks": """1. Pick a handful of outcomes the sponsor already recognizes as pain.
2. Pair each outcome with one leading indicator you can move this quarter.
3. Define the metric exactly: population, formula, source, and owner.
4. Show the series in the council, with a decision attached (fund, stop, investigate).
5. Retire metrics that have not changed a decision in two or three cycles.
6. Reassess capability gaps on a cadence instead of treating the first assessment as permanent.""",
    "example": """Northline’s sponsor cares that marketplace listings bounce for bad fiber content. The lagging metric is the share of publish attempts blocked for fiber, and the time to fix them. The leading metric is the share of active styles with a certified fiber value. In two months the certified share moves from 61 percent to 93 percent, and blocked publishes drop. The council stops reviewing a metric about “number of glossary terms” because nobody used it to choose work.""",
    "pitfalls": [
      "Reporting activity (meetings, documents) as if it were impact.",
      "A metric with no owner and no source system, rebuilt by hand before each meeting.",
      "So many KPIs that the council cannot see a story.",
      "Using a maturity score as a grade to punish teams rather than as a map of what to fund.",
      "Never dropping a metric, so the pack becomes a museum.",
    ],
    "checklist": [
      "Each displayed metric has a formula, a source, and an owner.",
      "Leading and lagging signals are both present.",
      "The council makes or confirms a decision when it reviews the pack.",
      "At least one metric is tied to a business outcome a sponsor recognizes.",
      "Low-value metrics are removed.",
      "Capability gaps are reassessed on a schedule.",
    ],
    "seeAlso": ["gov-councils", "qm-measure", "mdm-ops"],
    "extraQuiz": [
      {
        "q": "A leading indicator for a new governance program is more likely to be:",
        "choices": [
          "Percent of critical domains with a named owner",
          "Five-year brand value",
          "Number of fonts in the slide template",
          "Office attendance",
        ],
        "answerIndex": 0,
        "explain": "Leading indicators show the system is being put in place before lagging outcomes move.",
      },
      {
        "q": "DCAM is useful in this conversation as:",
        "choices": [
          "A public model for assessing data-management capability and planning improvements",
          "A retail SKU format",
          "A law that replaces counsel",
          "A dashboard theme",
        ],
        "answerIndex": 0,
        "explain": "DCAM is a capability assessment model. Detailed model text is membership material; the public role is assessment and improvement planning.",
      },
    ],
  },
  "gov-risk": {
    "concept": """Governance sits next to risk and compliance even when it is not the same team. The practical question is which obligations constrain a data decision, and which control will satisfy them. Public materials give you the landscape. GDPR Article 5, as summarized by gdpr.eu, lists principles for processing personal data: lawfulness, fairness and transparency; purpose limitation; data minimization; accuracy; storage limitation; integrity and confidentiality; and accountability. COBIT, from ISACA, is a framework for governing and managing enterprise information and technology, and it often sits beside data-specific frameworks rather than replacing them. NIST’s privacy and cybersecurity work, and the Research Data Framework, inform how many organizations describe controls and lifecycle stages.

None of that reading is legal advice, and Data Lens does not provide any. Implementers confirm obligations with qualified counsel and with their security team. The educational point is the translation step: a principle becomes a control you can operate. Minimization becomes a field list in the plan. Storage limitation becomes a retention job. Integrity and confidentiality become access reviews, encryption, and monitoring. Accountability becomes named owners and a decision log.

Map the obligation to the control, name the owner of the control, and test that it runs. A framework poster on the wall is not a control.""",
    "howItWorks": """1. Inventory the obligations that actually apply: contracts, privacy principles, security baselines, sector rules. Do this with specialists.
2. Translate each applicable obligation into a control: classification, access review, retention, quality rule, breach playbook.
3. Map the control onto a lifecycle stage so it is obvious when it must fire.
4. Record the evidence the control produces (a review ticket, a destruction log, a blocked publish).
5. Use COBIT-style or similar IT-governance processes where the issue is bigger than data: identity, change, operations.
6. Re-read the map when a new product, country, or partner changes the obligation. Do not freelance the legal conclusion.""",
    "example": """A proposed “birthday and income” block on the loyalty form fails the minimization conversation: nobody can name a necessary purpose. The form does not ship those fields. Storage limitation is implemented as a job that destroys marketing attributes 24 months after account closure and writes a log. Integrity shows up as role-based access and a quarterly review. The team documents the controls for the privacy office. They do not treat this lesson as clearance to operate in a new country.""",
    "pitfalls": [
      "Pasting a principle into a policy and never creating a control.",
      "Treating an educational summary as advice for a specific case.",
      "Assuming one framework (COBIT, DCAM, NIST, or a privacy law) covers every neighboring concern.",
      "Collecting evidence that does not match the control you claim to run.",
      "Expanding into a new use of personal data because the data is already on hand.",
    ],
    "checklist": [
      "Obligations in scope were identified with the right specialists.",
      "Each in-scope obligation maps to at least one operating control.",
      "Controls produce evidence.",
      "Retention and access reviews actually run.",
      "New uses of personal data trigger a fresh decision.",
      "The team knows this material is educational and where to get binding advice.",
    ],
    "seeAlso": ["gov-policies", "dama-security", "lc-archive-destroy"],
    "extraQuiz": [
      {
        "q": "Storage limitation becomes operational when the organization:",
        "choices": [
          "Keeps a poster of Article 5 and no deletion jobs",
          "Runs retention and destruction with a log, scoped by data class",
          "Stores every attribute forever to be safe",
          "Lets each analyst choose a personal retention habit",
        ],
        "answerIndex": 1,
        "explain": "A principle is not in force until a control implements it and leaves evidence.",
      },
    ],
  },
}
