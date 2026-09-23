# Original lesson bodies, part 2 — DAMA wheel knowledge areas.

LESSONS = {
  "dama-gov": {
    "concept": """On the DAMA wheel, data governance is the hub. Public overviews of DAMA-DMBOK describe eleven knowledge areas, with governance coordinating the others rather than sitting as an optional outer slice. The hub’s job is decision rights, policy, stewardship oversight, and issue management. Architecture, quality, security, and metadata still do their own work. They do it inside rules the hub can stand behind.

The outputs are mundane and that is the point: a policy set, a RACI, a decision log, an issue path, a council cadence. When those exist, a quality rule has someone to escalate to, and a security control has a business owner to confirm the classification. When they do not, each knowledge area writes local law.

This module is the wheel’s view of the same idea the governance track teaches in more depth. Read them together. The wheel tells you governance touches everything. The governance track tells you how the meetings and the rights actually work.""",
    "howItWorks": """1. Place governance at the center of a picture of the other ten areas.
2. For each neighboring area, name one decision governance must be able to settle (a standard, an owner, an exception path).
3. Check that the council or the domain owner can actually make that decision.
4. Feed issues from quality, access, and master data into one log so patterns are visible.
5. Publish the policies the other areas are expected to implement.
6. Review, on a cadence, whether local practices have drifted from those policies.""",
    "example": """Northline’s integration team wants a new product feed to bypass the certified-attribute flag “just for a pilot.” The request is not an integration design choice alone. It is a governance exception against the publish policy. The product owner denies it. The integration standard stays intact. The issue log records the request so the next pilot does not reopen it as if it were new.""",
    "pitfalls": [
      "Drawing governance in the center and funding only tools in the outer ring.",
      "Letting each knowledge area define “good” with no shared escalation.",
      "Using the wheel as a poster and never naming a decision it changed.",
      "Confusing the hub with a mandate to centralize every technical choice.",
    ],
    "checklist": [
      "You can name the hub-and-spoke idea without claiming the outer areas are optional.",
      "Each critical neighboring practice knows which decision governance owns.",
      "An issue log collects cross-area conflicts.",
      "Policies are the ones outer teams implement, not a parallel set.",
      "Exceptions are visible.",
    ],
    "seeAlso": ["gov-intro", "gov-councils", "dama-quality"],
    "extraQuiz": [
      {
        "q": "Governance sits at the center of the wheel in order to:",
        "choices": [
          "Replace architecture, security, and quality",
          "Coordinate decision rights so the other areas do not invent conflicting rules",
          "Eliminate the need for stewards",
          "Store all enterprise data in one table",
        ],
        "answerIndex": 1,
        "explain": "The hub coordinates. It does not absorb the other disciplines.",
      },
      {
        "q": "A bypass of a certified-data standard is best handled as:",
        "choices": [
          "A quiet local change",
          "An explicit exception with an owner and a log entry",
          "Proof the standard was never real",
          "An architecture problem only",
        ],
        "answerIndex": 1,
        "explain": "Exceptions are governance objects. Hidden bypasses dissolve the standard.",
      },
    ],
  },
  "dama-arch": {
    "concept": """Data architecture is the intentional blueprint of how data structures, platforms, and flows support the way the organization works. Public DAMA overviews describe it as the knowledge area that aligns data with strategy and with the rest of enterprise architecture. Without it, every project picks a store, a key, and an integration style, and the landscape becomes an accident.

The blueprint is not a single diagram of every column. It is a set of choices: which domains exist, which system is the record for each, where analytical copies are allowed, which patterns connect them (batch, API, stream), and which standards those patterns must meet. It should be detailed enough to stop a contradictory project and loose enough to survive more than one budget year.

Architecture serves governance and is constrained by it. Governance may decide that customer is a mastered domain. Architecture decides which platform holds the master, how downstream systems subscribe, and what “near real time” is allowed to mean. Those choices belong in writing before a second customer database is funded.""",
    "howItWorks": """1. Name the domains and the system of record for each.
2. Draw the allowed flows: who may publish, who may subscribe, and which patterns are standard.
3. Mark analytical paths separately from operational ones.
4. Align the picture with enterprise architecture so infrastructure and data are not planned in isolation.
5. Test new projects against the blueprint: does this create a rival system of record?
6. Update the blueprint when a real decision changes it, and version the picture.""",
    "example": """Northline’s blueprint says the PIM is the product system of record, the CRM is the customer system of record, and the warehouse may store copies for analysis but may not originate price or consent. A proposal to let the ecommerce database become editable for fiber content is rejected because it would create a second product master. The marketplace integration is drawn as a subscriber, not as a source.""",
    "pitfalls": [
      "A blueprint that lives in one architect’s head.",
      "Diagrams so detailed they are obsolete before they are printed, or so vague they cannot block a bad project.",
      "Letting analytical platforms become accidental systems of record.",
      "Choosing platforms before domains and ownership are named.",
      "Ignoring business capabilities and drawing only technology logos.",
    ],
    "checklist": [
      "Systems of record are named per domain.",
      "Allowed integration patterns are written down.",
      "Analytical copies are labeled as copies.",
      "New projects are checked against the blueprint.",
      "The picture has a version and an owner.",
      "Governance decisions (what must be mastered) are visible on the blueprint.",
    ],
    "seeAlso": ["dama-integration", "mdm-master", "lc-store"],
    "extraQuiz": [
      {
        "q": "An architecture review should stop a project when the project would:",
        "choices": [
          "Create a second system of record for a domain that already has one",
          "Use the approved publish pattern",
          "Add metadata to an existing feed",
          "Consult the domain owner",
        ],
        "answerIndex": 0,
        "explain": "The blueprint’s power is preventing rival sources of truth.",
      },
      {
        "q": "Data architecture is most useful when it is tied to:",
        "choices": [
          "Business capabilities and named domains, not only a catalog of tools",
          "A single vendor’s sales diagram",
          "Last year’s server names only",
          "Personal preferences of the newest team",
        ],
        "answerIndex": 0,
        "explain": "Public descriptions of the knowledge area stress alignment to enterprise goals and structure.",
      },
    ],
  },
  "dama-model": {
    "concept": """Data modeling turns business meaning into structures other people can share. Practitioners usually work at three levels. A conceptual model names entities and relationships in business language: Customer places Order, Style has SKU. A logical model adds attributes, keys, and rules without committing to a product. A physical model implements those choices for a platform, including performance and integrity features.

Most expensive data arguments are modeling arguments that were skipped. “Customer” including or excluding guest checkouts, “style” versus “SKU,” a price that is an attribute versus a time-varying fact: if the model is silent, every system answers differently. Quality incidents later are often these silent answers colliding.

Models are maintained, not framed. When the assortment adds marketplace-only variants, the model changes on purpose, with the owner’s approval, and downstream physical designs follow. A model nobody is allowed to update becomes fiction. A model anybody can update in production becomes chaos.""",
    "howItWorks": """1. Start conceptual: entities, relationships, and definitions the business recognizes.
2. Move to logical: attributes, identifiers, cardinality, and rules that must always be true.
3. Implement physical designs per platform, and keep them traceable to the logical model.
4. Identify critical data elements and give them definitions before columns proliferate.
5. Review changes with the steward and the owner when meaning shifts, not only when a type changes.
6. Test the model against real sentences: “one Maya, two addresses, one consent.” If the model cannot say it, the model is wrong.""",
    "example": """Northline models Style and SKU as different entities. The Harbor Beanie style has one fiber content and many SKUs by size. Color is a reference-data relationship, not a free-text attribute. Guest checkout and registered account are both Customer, linked by survivorship rules rather than by a hope that emails match. The logical rule “a sellable SKU requires a style with certified fiber” is what the PIM workflow later enforces.""",
    "pitfalls": [
      "Starting at the physical table because a project is in a hurry.",
      "Using the same word for two entities (customer, account, profile) without definitions.",
      "Letting a reporting extract invent a new grain that contradicts the operational model.",
      "Freezing the conceptual model so it cannot absorb a real business change.",
      "Hiding keys and cardinality in a tool nobody outside the modeling group can read.",
    ],
    "checklist": [
      "Conceptual, logical, and physical views exist for critical domains, even as sketches.",
      "Entities in the model match glossary terms.",
      "Identifiers and cardinality are explicit.",
      "Critical rules are written as rules, not as tribal knowledge.",
      "A change path exists when the business meaning shifts.",
      "Physical designs can be traced back to the logical model.",
    ],
    "seeAlso": ["qm-metadata-types", "mdm-hierarchy", "dama-arch"],
    "extraQuiz": [
      {
        "q": "A logical model is the right place to specify:",
        "choices": [
          "Attributes, keys, and business rules without tying them to one database product",
          "Only disk stripe size",
          "The brand typeface",
          "Which person is on call tonight",
        ],
        "answerIndex": 0,
        "explain": "Logical models sit between business meaning and physical implementation.",
      },
      {
        "q": "Modeling Style and SKU as the same entity would most likely cause:",
        "choices": [
          "Fiber content to be copied and contradicted on every size variant",
          "Clearer hierarchy reporting",
          "Fewer quality rules",
          "Automatic golden records",
        ],
        "answerIndex": 0,
        "explain": "Grain mistakes push shared facts down onto repeating rows, where they drift.",
      },
    ],
  },
  "dama-storage": {
    "concept": """Data storage and operations keep structured data reliable after the model exists. Public DAMA descriptions put capacity, performance, availability, backup, and the operational care of databases and file stores in this knowledge area. It is the engineering of custody: deploy, patch, monitor, recover, and eventually retire a store.

Governance decides retention and classification. Operations makes those decisions mechanical. A retention schedule that no job implements is a wish. A backup policy that has never been restored is a rumor. This area also retires platforms. Old stores left running “just in case” become unowned copies with live credentials.

The partnership with security is constant: encryption, patching, access layers, and audit logging are operational work done to a security standard. The partnership with stewards is about freshness and incident impact. When a load fails, operations detects it and the steward decides the business consequence.""",
    "howItWorks": """1. Define service levels for the systems of record: availability, recovery point, recovery time, and freshness.
2. Implement backup and a calendar of restore tests.
3. Patch and capacity-plan before incidents choose the timing for you.
4. Turn retention and archival decisions into jobs with logs.
5. Monitor pipelines and page a human when freshness breaks a promise.
6. Decommission obsolete stores, including the accounts that could still read them.""",
    "example": """The PIM’s stated recovery point is 15 minutes and the team’s quarterly drill restores last Tuesday’s Harbor Beanie price change correctly. A failed hourly channel export pages the on-call custodian, who alerts the product steward before stores sell yesterday’s price all morning. At year end an old “product_v3” database is exported for archive, access is removed, and the instance is shut down instead of remaining an unofficial edit path.""",
    "pitfalls": [
      "Service levels that were never agreed with the business, so every incident is a surprise argument.",
      "Restore tests that are perpetually scheduled for next quarter.",
      "Retention implemented as a shared folder nobody cleans.",
      "Orphan platforms with production data and no owner.",
      "Monitoring the server’s CPU and not the freshness of the data on it.",
    ],
    "checklist": [
      "Recovery and freshness targets exist for systems of record.",
      "Restore tests have dates and outcomes.",
      "Retention jobs match the schedule and write logs.",
      "Patching and access layers follow the security standard.",
      "Failed loads alert a person who knows the business impact.",
      "Retired stores are actually retired.",
    ],
    "seeAlso": ["lc-store", "dama-security", "lc-archive-destroy"],
    "extraQuiz": [
      {
        "q": "Operations implements a governance retention rule by:",
        "choices": [
          "Filing the policy PDF in a wiki only",
          "Running a job that archives or deletes according to the schedule and records the result",
          "Asking users to remember to delete their own files",
          "Keeping every backup indefinitely by default",
        ],
        "answerIndex": 1,
        "explain": "Storage and operations is where retention becomes a mechanism.",
      },
      {
        "q": "An obsolete database that still accepts logins is:",
        "choices": [
          "A harmless archive",
          "An unowned copy and an access risk until it is decommissioned",
          "The new system of record",
          "Required by every lifecycle model",
        ],
        "answerIndex": 1,
        "explain": "Retirement of stores is part of the knowledge area, not an afterthought.",
      },
    ],
  },
  "dama-security": {
    "concept": """Data security protects confidentiality, integrity, and the availability that legitimate users still need. In the DAMA wheel it is a knowledge area in its own right and a partner to privacy obligations. The work starts with classification, because controls should be proportionate. Public product content does not need the same handling as payment tokens or a government identifier.

Typical controls are familiar and still frequently skipped: authenticated access, least privilege, encryption in transit and at rest where the class requires it, masking in lower environments, monitoring, and a rehearsed response when something goes wrong. Security designed in at Plan and Create is cheaper than security bolted on after a listing page has already leaked a cost field.

Security does not set business purpose. Owners do. A security team that is asked to “just lock it down” without a classification and a purpose will either block the business or guess. Neither is governance. The knowledge area works when business rules and control implementation are both explicit.""",
    "howItWorks": """1. Classify the data with the owner.
2. Choose controls that match the class: access, encryption, masking, logging, and retention of the logs themselves.
3. Separate duties where it matters: the person who approves access is not the only person who can audit it.
4. Mask or synthesize data in non-production environments.
5. Monitor for unusual access and failed controls.
6. Practice the incident path with the people who would actually be on it.""",
    "example": """Cost price of the Harbor Beanie is classified as internal commercial. It never joins the marketplace feed. In the analytics sandbox, cost is visible only to the pricing role; other analysts see a margin band. Maya’s government identifier is not collected at all. Her email is encrypted at rest in the CRM, and a support agent’s role can see it while a warehouse planner’s role cannot. A quarterly access review removes two contractors whose campaign ended.""",
    "pitfalls": [
      "One security setting for all data because classification never happened.",
      "Production data copied into laptops and test systems with the controls left behind.",
      "Shared accounts that make least privilege impossible to audit.",
      "Encryption without key management, which is obscurity with extra steps.",
      "Treating security as a late review that can only say no, instead of a design input.",
    ],
    "checklist": [
      "Critical assets are classified.",
      "Access is least privilege and attributable to a person or service.",
      "Encryption matches policy for the class.",
      "Non-production data is masked or reduced.",
      "Monitoring and an incident path exist.",
      "Access reviews happen and remove stale grants.",
    ],
    "seeAlso": ["gov-risk", "lc-share", "roles-trio"],
    "extraQuiz": [
      {
        "q": "Proportionate control means:",
        "choices": [
          "The strictest control on every field regardless of sensitivity",
          "Stronger handling where classification says the impact of exposure is higher",
          "No controls on data that is already inside the network",
          "Security teams choose business purpose alone",
        ],
        "answerIndex": 1,
        "explain": "Classification exists so controls match the harm.",
      },
      {
        "q": "A shared team password undermines data security mainly because:",
        "choices": [
          "You cannot tell who used the access or remove one person cleanly",
          "Passwords are always unnecessary",
          "Encryption becomes stronger",
          "Stewards prefer shared accounts",
        ],
        "answerIndex": 0,
        "explain": "Attributable, least-privilege access is a core control.",
      },
    ],
  },
  "dama-integration": {
    "concept": """Data integration and interoperability move and align data so a consumer can use it without negotiating a new one-off every time. The knowledge area covers batch ETL or ELT, replication, APIs, streaming, and virtualization. Interoperability is the outcome: systems exchange data through agreed formats, meanings, and error behaviors.

A feed is a contract. The contract names the schema, the freshness, the identifiers, what happens when a record fails validation, and who is told. Point-to-point spaghetti grows when every consumer gets a private extract with private meanings. A small set of published interfaces, tied to systems of record, is how the architecture blueprint survives contact with projects.

Lineage is the metadata this area owes the rest of the wheel. If the marketplace price is wrong, someone must trace it to the PIM field and the job version in minutes, not days. Integration without lineage is how defects travel in silence.""",
    "howItWorks": """1. Publish interfaces from systems of record instead of letting consumers scrape where they can.
2. Version the schema and give consumers a deprecation window.
3. Define error handling: reject the record, quarantine it, or fail the batch—and say which.
4. Include identifiers that survive across systems (the SKU, the customer master id).
5. Capture lineage from source field to target field.
6. Retire interfaces that no longer have a consumer.""",
    "example": """The certified product feed to ecommerce is versioned. When fiber becomes mandatory, the schema’s new major version rejects SKUs that lack it, and the old version runs for three weeks with a warning. A price mismatch on the Harbor Beanie is traced in the lineage view from the web price to the hourly job and back to the PIM price effective-dated row. The job did not invent a price. A future-dated PIM row had been published early, and the rule is corrected.""",
    "pitfalls": [
      "A new point-to-point extract for every campaign.",
      "Silent truncation or type coercion that “usually works.”",
      "Breaking changes shipped without a version or a window.",
      "Interfaces nobody monitors, discovered broken by a customer.",
      "Identifiers that differ in every system so joins become guesswork.",
    ],
    "checklist": [
      "Critical flows have a named contract: schema, freshness, errors, owner.",
      "Schemas are versioned.",
      "Failures are visible and routed.",
      "Lineage connects source to consumer for critical fields.",
      "Shared identifiers are used.",
      "Obsolete feeds are turned off.",
    ],
    "seeAlso": ["dama-arch", "qm-lineage-catalog", "lc-share"],
    "extraQuiz": [
      {
        "q": "An integration contract should state:",
        "choices": [
          "Schema, freshness, and what happens to invalid records",
          "Only the file name",
          "That consumers may reinterpret fields freely",
          "That errors should be swallowed to keep the job green",
        ],
        "answerIndex": 0,
        "explain": "Interoperability depends on shared expectations, including failure behavior.",
      },
      {
        "q": "Lineage from an integration flow is what lets you:",
        "choices": [
          "Trace a consumer’s wrong value back to the source field and job",
          "Avoid having a system of record",
          "Skip quality rules",
          "Encrypt data by drawing a diagram",
        ],
        "answerIndex": 0,
        "explain": "Lineage is how integration defects stay explainable.",
      },
    ],
  },
  "dama-content": {
    "concept": """A large share of organizational knowledge is unstructured: line sheets, care PDFs, studio images, supplier contracts, research notes. Documents and content management is the knowledge area that gives this material a lifecycle—classification, retention, findability, and disposal—rather than leaving it in personal drives.

Content still needs owners and metadata. A care label PDF that cannot be tied to a style code will be republished from someone’s desktop, and the PIM’s structured fiber field will drift from the words on the label. Taxonomies, search, and records practices exist so the right version can be found and the wrong version can be retired.

This area is also where collaboration tools become shadow stores. If the official spec lives in a chat thread, you do not have content management. You have a scavenger hunt. The structured master (the PIM attribute) and the unstructured source (the mill sheet) should point at each other.""",
    "howItWorks": """1. Decide which content types are records and which are working drafts.
2. Store official content in a platform with identity, versioning, and retention.
3. Tag content with the business identifiers it supports (style, supplier, study).
4. Classify sensitive documents and restrict them the same way you would restrict a table of the same class.
5. Link unstructured sources to structured attributes so they can be audited together.
6. Dispose of drafts and superseded versions on the schedule, not when a drive fills up.""",
    "example": """The mill’s composition PDF for the Harbor Beanie is stored in the content system, version 3, linked to style NL-HAT-204. The PIM fiber attribute cites that version. A designer’s older screenshot in a team chat is not authoritative; the retention job removes draft selects after launch while the official image set remains with the style. A supplier contract with cost terms is classified as internal and is not in the same open library as the care PDF.""",
    "pitfalls": [
      "Official facts living only in inboxes and chat.",
      "No link between a document and the structured record it is supposed to support.",
      "Keeping every draft forever because versioning felt like extra work.",
      "Applying retention to databases and forgetting file shares.",
      "Full-text search with no ownership, so people find confidential material they should not open.",
    ],
    "checklist": [
      "Official content has a home with versions and access control.",
      "Content is tagged with business identifiers.",
      "Classification and retention apply to files, not only tables.",
      "Structured attributes cite the content version they came from.",
      "Drafts have a disposal path.",
      "Search respects permissions.",
    ],
    "seeAlso": ["lc-create", "lc-archive-destroy", "qm-metadata-types"],
    "extraQuiz": [
      {
        "q": "Linking a mill PDF to a style code matters because:",
        "choices": [
          "The structured fiber value can be traced to the unstructured source version",
          "PDFs do not need owners",
          "Chat threads are a system of record",
          "Taxonomies replace access control",
        ],
        "answerIndex": 0,
        "explain": "Content management and structured master data should point at the same business object.",
      },
      {
        "q": "A collaboration inbox becomes a problem for this knowledge area when:",
        "choices": [
          "It is the only place the official specification exists",
          "It is used to discuss a draft that also lives in the content system",
          "Messages are retained for a short period",
          "People use search",
        ],
        "answerIndex": 0,
        "explain": "Unmanaged shadow content is the failure mode the discipline is meant to reduce.",
      },
    ],
  },
  "dama-refmdm": {
    "concept": """Reference and master data is the knowledge area for the shared nouns of the business. Reference data is the controlled vocabulary: color codes, country codes, size scales, status lists. Master data is the shared entities: customer, product, supplier, location, and the relationships among them. Public DAMA overviews group them because both must be consistent everywhere even though they behave differently.

Transactions cite these nouns. An order is not master data; the customer and the SKU on the order are. If those nouns disagree across systems, every downstream report inherits the disagreement. The goal of the knowledge area is a trusted view—often a golden record for a master entity—and controlled lists for the values on it.

Stewardship is the operating heart. Software can match and validate. People approve survivorship rules, hierarchy changes, and the awkward cases. The MDM track in this site goes deeper on golden records, match and merge, hierarchies, and day-2 queues. This module places that work on the wheel so you can see it beside quality, integration, and governance.""",
    "howItWorks": """1. Separate reference lists from master entities and from transactions in your inventory.
2. Give each list and each master domain an owner and a steward.
3. Choose systems of record and the paths that publish changes outward.
4. Define match, survivorship, and validation rules where more than one source can create the entity.
5. Version reference data and effective-date hierarchies.
6. Measure duplicates, exceptions, and time to publish a change.""",
    "example": """Color Charcoal is reference data owned by design operations. The Harbor Beanie style is master data owned by merchandising. Maya Chen is master data owned by the customer domain. An order for the beanie is a transaction that may only cite a valid color code, a published SKU, and a mastered customer id. When the web signup and the store card both claim Maya, the master-data process—not the order table—resolves the identity.""",
    "pitfalls": [
      "Treating every table as master data so the program drowns.",
      "Letting each channel invent color and size values.",
      "Mastering the entity but not the relationships (which store, which brand, which household).",
      "Buying an MDM tool before naming owners and survivorship principles.",
      "Ignoring reference data because it looks “too small” to govern, then watching validity fail everywhere.",
    ],
    "checklist": [
      "Master domains and reference lists are identified and owned.",
      "Transactions are not mistaken for master data.",
      "A system of record and a publish path exist.",
      "Match and survivorship rules are written where sources overlap.",
      "Reference lists are versioned.",
      "Exception queues have stewards.",
    ],
    "seeAlso": ["mdm-master", "mdm-reference", "mdm-golden"],
    "extraQuiz": [
      {
        "q": "An online order line is usually:",
        "choices": [
          "A transaction that references master and reference data",
          "Itself a golden customer record",
          "A reference code list",
          "Unstructured content",
        ],
        "answerIndex": 0,
        "explain": "Transactions cite the shared nouns. They are not those nouns.",
      },
      {
        "q": "Reference and master data are grouped on the wheel because:",
        "choices": [
          "Both must be shared consistently, even though lists and entities are managed differently",
          "They are the same object",
          "Neither needs an owner",
          "They replace data quality",
        ],
        "answerIndex": 0,
        "explain": "The knowledge area covers both, and the practices differ in depth.",
      },
    ],
  },
  "dama-dwbi": {
    "concept": """Data warehousing and business intelligence turn curated analytical data into numbers people will repeat in meetings. The knowledge area includes the structures—warehouses, marts, and newer lakehouse patterns—and the delivery: semantic layers, certified metrics, and access controls on reports. Public DAMA overviews emphasize that this consumption layer depends on upstream modeling, integration, and quality. BI cannot invent trust the upstream never supplied.

The most common failure is two dashboards with two definitions of the same word. “Revenue,” “active customer,” and “in-stock style” must be certified or labeled as exploratory. A semantic layer is how that certification becomes something a report author consumes instead of reimplementing.

Separate sandboxes from certified paths. Exploration is allowed and useful. It should look different from the board pack, down to the label on the chart. Access control still applies; an analytical copy of customer data is still customer data.""",
    "howItWorks": """1. Define certified metrics in a semantic layer, each with an owner and a formula.
2. Source those metrics from curated, freshness-aware tables, not from ad-hoc joins in every report.
3. Label exploratory analysis so it cannot be screenshotted as official.
4. Apply the same classification and access rules to analytical copies.
5. Trace a disputed number back through lineage before changing the SQL in place.
6. Retire reports that contradict the certified definition.""",
    "example": """“Active loyalty customer” is certified as a profile with consent and a purchase in 24 months. The board pack uses that metric. A regional manager’s private workbook counts anyone with an email and shows a larger number. The workbook is labeled exploratory and is not linked from the official portal. When finance disputes the reorder rate for the Harbor Beanie, lineage shows the metric uses shipped units, not page views. The argument ends in the definition, not in a new spreadsheet.""",
    "pitfalls": [
      "A semantic layer that is optional, so every team keeps a private formula.",
      "Certified reports built on uncertified upstream attributes.",
      "Copying production customer data into a widely shared extract for “speed.”",
      "No freshness stamp, so a stale cube looks authoritative.",
      "Debugging a dispute by editing the chart instead of the definition.",
    ],
    "checklist": [
      "Certified metrics have owners, formulas, and a single implementation.",
      "Official reports use those metrics.",
      "Exploratory work is visibly marked.",
      "Analytical access matches classification.",
      "Freshness is visible to the reader.",
      "Disputes are resolved by tracing lineage and, if needed, changing the certified definition on purpose.",
    ],
    "seeAlso": ["dama-metadata", "qm-measure", "gov-metrics"],
    "extraQuiz": [
      {
        "q": "A semantic layer earns its keep when:",
        "choices": [
          "Report authors reuse certified definitions instead of re-coding them",
          "Each dashboard invents revenue from scratch",
          "It hides lineage",
          "It removes the need for quality upstream",
        ],
        "answerIndex": 0,
        "explain": "The layer is how BI stays consistent with governed definitions.",
      },
      {
        "q": "An analytical copy of personal data:",
        "choices": [
          "Inherits access and purpose constraints",
          "Is automatically anonymous because it is in a warehouse",
          "Can be shared more widely than the source by default",
          "Does not need freshness",
        ],
        "answerIndex": 0,
        "explain": "Moving data into BI does not change its sensitivity.",
      },
    ],
  },
  "dama-metadata": {
    "concept": """Metadata is data about data: what a field means, who owns it, how it is structured, how fresh it is, where it came from, and who may see it. The DAMA wheel treats metadata management as its own knowledge area because every other area produces metadata and depends on it. Without it, reuse starts with reverse engineering.

People often split metadata into kinds, which the quality track covers in depth: business (definitions, owners), technical (schemas, jobs), operational (run history, volumes), and governance (classification, retention). A catalog that lists tables but not meaning has only the technical slice. A glossary with no link to columns has only the business slice. The knowledge area is the discipline of keeping those slices connected.

Lineage is the metadata that makes change safe. Before a customer identifier is renamed or a product attribute is retired, lineage shows the pipelines and reports in the blast radius. Metadata also powers automation: a classification tag can drive masking, a freshness timestamp can drive a page, a certified flag can drive a feed.""",
    "howItWorks": """1. Capture business definitions for critical elements in a glossary people actually open.
2. Harvest technical metadata from platforms rather than retyping it.
3. Record operational metadata from the jobs themselves: success, volume, freshness.
4. Attach governance tags: classification, retention, certification.
5. Connect glossary terms to physical fields and to lineage.
6. Use the tags in controls—masking, blocking a publish, routing an incident—so metadata is operational, not decorative.""",
    "example": """The term “fiber content” sits in the glossary, owned by the product steward, linked to PIM.Style.fiber and to the marketplace feed column. The hourly job writes operational metadata: last success 06:12, 14 rejected styles. Classification on cost price is “internal,” and the sandbox role uses that tag to mask it. When the steward proposes retiring legacy_loyalty_tier, lineage lists two campaigns and one extract still reading it, so the retirement plan includes those consumers.""",
    "pitfalls": [
      "A catalog project that harvests schemas and never assigns owners or definitions.",
      "A glossary that is not linked to fields, so it cannot stay true.",
      "Lineage that is drawn once in a workshop and never refreshed.",
      "Tags nobody’s controls read.",
      "So much metadata that critical elements are indistinguishable from trivia.",
    ],
    "checklist": [
      "Critical elements have business definitions and owners.",
      "Technical metadata is harvested.",
      "Jobs emit freshness and status.",
      "Classification and certification are tagged.",
      "Lineage covers critical paths.",
      "At least one control uses metadata rather than a hard-coded exception.",
    ],
    "seeAlso": ["qm-metadata-types", "qm-lineage-catalog", "dama-quality"],
    "extraQuiz": [
      {
        "q": "Metadata becomes operational when:",
        "choices": [
          "A tag changes a control, such as masking or a publish block",
          "It is stored in a poster",
          "Only engineers can see it",
          "Definitions contradict the columns they describe",
        ],
        "answerIndex": 0,
        "explain": "The knowledge area pays off when systems act on metadata.",
      },
      {
        "q": "Before retiring a widely used attribute, metadata management expects you to consult:",
        "choices": [
          "Lineage and ownership so consumers and the accountable role are known",
          "Only the column’s data type",
          "A random sample of dashboards with no list",
          "The font of the glossary",
        ],
        "answerIndex": 0,
        "explain": "Lineage and ownership are the metadata that make a retirement safe.",
      },
    ],
  },
  "dama-quality": {
    "concept": """Data quality management defines what “fit for use” means for a decision, measures it, and drives fixes at the cause. Public teaching, including IBM’s overview of quality dimensions and DAMA’s placement of quality on the wheel, keeps returning to a small set of lenses: accuracy, completeness, consistency, timeliness, validity, and uniqueness. Dimensions are how you talk about fitness. They are not the program.

The program is a loop. Profile to see what you have. Choose critical data elements with an owner. Set rules and thresholds. Monitor in the flow. Remediate the upstream cause. Report the trend where funding decisions happen. A one-time cleanse of a spreadsheet feels productive and leaves the next load as dirty as the last.

Quality is cross-functional on purpose. Modelers prevent impossible states. Stewards define rules. Pipelines enforce them. Owners accept the threshold because they live with the business risk. A quality team that “owns data quality” alone will measure defects it cannot close.""",
    "howItWorks": """1. Select critical elements tied to a real decision or obligation.
2. Profile them: nulls, invalid values, duplicates, staleness, conflicts across systems.
3. Turn the worst findings into rules with thresholds the owner accepts.
4. Execute the rules in pipelines or mastering workflows, not only in a monthly report.
5. Route failures to the people who can fix the source.
6. Review trends in the governance cadence and drop rules that do not change behavior.""",
    "example": """Fiber content is critical because marketplace listings are rejected without it. Profiling shows 39 percent of active styles null or free-text. The owner sets the rule: a style cannot be certified if fiber lacks a percentage. The PIM blocks publish. The steward works the backlog by brand. Two months later the null rate for active styles is under 7 percent, and the rule stays in the flow so the rate cannot quietly climb back.""",
    "pitfalls": [
      "Measuring every column and governing none.",
      "Cleansing downstream extracts while the source form still allows junk.",
      "Thresholds with no owner, so every breach is debated from scratch.",
      "Dashboards that report quality but do not create a task.",
      "Declaring victory after a migration cleanse.",
    ],
    "checklist": [
      "Critical elements are named and tied to decisions.",
      "Rules have thresholds and owners.",
      "Checks run in the flow.",
      "Failures create work for the upstream team.",
      "Trends are reviewed where priorities are set.",
      "At least one rule blocks a harmful use, such as an uncertified publish.",
    ],
    "seeAlso": ["qm-dimensions", "qm-measure", "mdm-ops"],
    "extraQuiz": [
      {
        "q": "Fit for use means:",
        "choices": [
          "The data is good enough for a stated decision, which may differ from another decision",
          "Every field is perfect for every possible future use",
          "A tool has been purchased",
          "The data has been copied into a warehouse",
        ],
        "answerIndex": 0,
        "explain": "Quality is relative to purpose. That is why owners accept thresholds.",
      },
      {
        "q": "A sustainable quality program fixes:",
        "choices": [
          "The upstream capture or rule that creates the defect",
          "Only the slide that revealed the defect",
          "A one-time extract, with no change to the source",
          "The glossary font",
        ],
        "answerIndex": 0,
        "explain": "Root-cause remediation is the difference between a program and a cleanse.",
      },
    ],
  },
}
