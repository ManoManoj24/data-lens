# Original lesson bodies, part 3 — roles, quality & metadata, MDM (including new modules).

LESSONS = {
  "roles-trio": {
    "concept": """Three roles keep data decisions from collapsing into whoever last touched the server. The data owner is accountable for a domain: access principles, quality expectations, definitions that matter, and policy exceptions. The data steward operationalizes that accountability—definitions, quality monitoring, issue triage, and the translation between business language and technical change. The data custodian, usually in a platform or IT role, implements storage, security, backup, and access mechanics to the standard the owner and steward set.

Public comparisons, including DataSunrise’s overview of the three roles and ELIXIR’s research-steward guidance, agree on the split even when job titles differ. Owners decide. Stewards care for meaning and fitness day to day. Custodians run the machinery. In a small organization one person may wear two hats. They should still know which hat is speaking, because the person who can drop a table should not silently become the person who approves a new use of personal data.

The trio is a teaching model, not a headcount mandate. What matters is that accountability, domain care, and technical control are all visible.""",
    "howItWorks": """1. Name an owner for each critical domain. Prefer one person who can say no.
2. Name stewards close to the business process, with time allocated, not as unpaid overtime.
3. Name custodians for the platforms that hold the domain.
4. Write a short RACI for the decisions you actually make: access, definition change, quality threshold, retention exception.
5. Give stewards a queue and give owners a cadence to clear escalations.
6. When hats combine, label the decision: “acting as owner” versus “acting as custodian.”""",
    "example": """For Northline customers, the CRM director is owner, a loyalty analyst is steward, and the CRM platform engineer is custodian. Maya Chen’s suspected duplicate is triaged by the steward. The engineer does not merge records because a job can. The owner approves the survivorship policy the steward applies. For product, merchandising leadership owns the domain, a PIM steward certifies the Harbor Beanie, and the PIM administrator implements workflow permissions the steward requested.""",
    "pitfalls": [
      "An owner who is a job title on a slide and never reviews an exception.",
      "Stewards with responsibility and no time or authority.",
      "Custodians who approve business use because they are the only ones who can click the button.",
      "Combining all three into “the data person” and losing any challenge function.",
      "Naming a committee as the steward so the queue belongs to nobody.",
    ],
    "checklist": [
      "Each critical domain has a named owner.",
      "Stewards have a defined queue and time to work it.",
      "Custodians know which changes require owner or steward approval.",
      "The trio is written into the access and change process.",
      "Combined hats are labeled when one person holds them.",
      "Escalations have a response time the owner has agreed to.",
    ],
    "seeAlso": ["roles-raci", "gov-decision-rights", "mdm-ops"],
    "extraQuiz": [
      {
        "q": "A steward’s typical day-to-day work includes:",
        "choices": [
          "Maintaining definitions, triaging quality or match issues, and preparing decisions for the owner",
          "Personally funding the program",
          "Setting enterprise law without reference to policy",
          "Avoiding all contact with technical teams",
        ],
        "answerIndex": 0,
        "explain": "Stewards operationalize policy. They are the bridge, not the platform and not the executive sponsor.",
      },
      {
        "q": "If one person is both steward and custodian, the organization should still:",
        "choices": [
          "Distinguish which role is approving a decision versus implementing it",
          "Stop documenting decisions",
          "Remove the owner",
          "Share the administrator password",
        ],
        "answerIndex": 0,
        "explain": "Combined hats are common. Invisible hats are the risk.",
      },
    ],
  },
  "roles-council-cdo": {
    "concept": """Domain owners cannot settle every conflict, and stewards cannot fund themselves. Enterprise data work needs a sponsor with authority, a lead who coordinates across domains—often a chief data officer or a head of data—and a council that can adopt a standard and make it stick. Public DAMA overviews describe this operating layer as part of how governance is exercised, not as a separate fashion.

The sponsor removes blockers and chooses the program over the next shiny project when they compete. The CDO or equivalent lead keeps a single strategy: which domains are in scope, how platforms line up, and whether the council is deciding or merely updating. The council is the cross-functional decision body. Working groups go deep and bring back a recommendation. Authority without expertise issues slogans. Expertise without authority writes beautiful standards that teams ignore.

Balance is a design choice. Seat people who understand the data and people who can commit budget and behavior. If only one of those groups attends, expect the failure mode that matches the absence.""",
    "howItWorks": """1. Name the sponsor and what they will personally unblock.
2. Name the enterprise data lead and the decisions they coordinate versus the decisions domain owners keep.
3. Charter the council with membership that can commit.
4. Use working groups for glossary, quality, and mastering proposals.
5. Log decisions and assign an owner to carry each one out.
6. Review whether the sponsor’s priorities and the council’s agenda are the same list.""",
    "example": """Northline’s COO sponsors the program and tells marketplace launch leads they cannot bypass certified attributes. The head of data sets the sequence: product content first, customer identity second. The council adopts the color reference list. A working group of PIM stewards and a digital engineer returns six weeks later with match-threshold options for customer records. The council picks the cautious threshold. The head of data is not asked to personally merge Maya’s duplicates; the steward queue does that under the rule the council chose.""",
    "pitfalls": [
      "A CDO title with no council and no domain owners.",
      "A council the sponsor never attends and never enforces.",
      "Working groups that continue forever and never bring a decision.",
      "Enterprise leads who overrule domain owners on definitions they do not understand.",
      "Sponsors who fund a tool and not the steward time to run it.",
    ],
    "checklist": [
      "A sponsor is named and has unblocked something visible.",
      "An enterprise data lead coordinates scope and platforms.",
      "The council’s members can commit their functions.",
      "Working groups have a question to answer and a date.",
      "The decision log shows choices, not only attendance.",
      "Steward capacity is funded alongside any platform spend.",
    ],
    "seeAlso": ["gov-councils", "roles-trio", "gov-metrics"],
    "extraQuiz": [
      {
        "q": "Executive sponsorship is working when:",
        "choices": [
          "A conflicting project is actually stopped or sequenced because of a data decision",
          "The org chart contains the word sponsor",
          "The sponsor writes survivorship SQL",
          "The council meets without an agenda",
        ],
        "answerIndex": 0,
        "explain": "Sponsorship is proven by priority and air cover, not by a box on a slide.",
      },
      {
        "q": "A healthy split between a CDO (or data lead) and a domain owner is:",
        "choices": [
          "The lead coordinates enterprise standards; the owner remains accountable for domain definitions and exceptions",
          "The lead personally approves every cell in every spreadsheet",
          "Domain owners are abolished",
          "The council replaces both",
        ],
        "answerIndex": 0,
        "explain": "Enterprise coordination does not erase domain accountability.",
      },
    ],
  },
  "roles-raci": {
    "concept": """RACI is a responsibility matrix. Responsible people do the work. One Accountable person owns the outcome. Consulted people give input before the decision. Informed people are told after. The letters are simple on purpose so a team can apply them to a real decision in one sitting: who may retire an attribute, who approves a survivorship rule, who is told when a feed breaks.

The matrix fails in two common ways. Everyone is Accountable, which means nobody is. Or the matrix is accurate and invisible, living in a deck the ticketing system does not mention. A third failure is freezing it. Reorganizations and platform changes move the work. A RACI from three systems ago will route decisions to people who have left.

Use RACI on recurring governance activities rather than on every task in a project plan. Classification, access reviews, master-data changes, retention exceptions, and quality-threshold changes are the right grain. Publish it next to the form people already fill out.""",
    "howItWorks": """1. Pick one decision and write it as a verb phrase, not a department name.
2. List the roles involved, not a dozen named individuals—titles survive vacations.
3. Assign letters. Confirm there is exactly one A.
4. Check that the A has the authority to say no, and that at least one R has time to do the work.
5. Put the matrix where the request is made.
6. Revisit it when roles or systems change, and date the revision.""",
    "example": """Decision: retire the customer attribute legacy_loyalty_tier. Owner = A, steward = R, custodian = C, CDO = I. The steward files the change, attaches lineage showing two downstream extracts, and updates the glossary. The custodian is consulted on the drop and executes it inside the approved change window. The CDO sees the decision in the monthly log and does not have to approve a local attribute retirement. Marketing, which consumes the field, is Informed and given a cutoff date.""",
    "pitfalls": [
      "Multiple A’s for comfort.",
      "An A who cannot actually refuse the request.",
      "Consulted parties brought in after the decision, which turns C into a surprised I.",
      "A matrix that names people who left and has no role-based backup.",
      "Using RACI for a single project and not for the decision the organization will face again next month.",
    ],
    "checklist": [
      "The decision is specific.",
      "There is exactly one Accountable role.",
      "Responsible roles have capacity.",
      "Consulted roles are asked before the decision.",
      "The matrix is linked from the request path.",
      "The matrix has a review date.",
    ],
    "seeAlso": ["gov-decision-rights", "roles-trio", "mdm-ops"],
    "extraQuiz": [
      {
        "q": "In RACI, Informed differs from Consulted because Informed people:",
        "choices": [
          "Hear the outcome and do not have a veto or a pre-decision input role",
          "Must approve before anything changes",
          "Perform the hands-on work",
          "Are always the CDO",
        ],
        "answerIndex": 0,
        "explain": "Consulted input happens before. Informed notification happens after.",
      },
      {
        "q": "A RACI should be revisited when:",
        "choices": [
          "The org chart or the system of record changes",
          "The font of the matrix looks dated",
          "A single ticket is closed successfully",
          "Nobody has disagreed in a year, so the letters can be deleted",
        ],
        "answerIndex": 0,
        "explain": "The matrix is an operating tool. Structural change makes it lie.",
      },
    ],
  },
  "roles-fair-culture": {
    "concept": """FAIR is a shared standard of care for making data usable by people and by machines: Findable, Accessible, Interoperable, and Reusable. The GO FAIR Foundation publishes the principles and their sub-principles. Stewards use them as a north star for documentation and sharing. They complement governance and ethics; they do not replace consent, community expectations, or security.

Findable means a persistent identifier and rich metadata indexed somewhere a search can see. Accessible means a standard way to retrieve the data, with authentication when it should not be open, and metadata that can remain available even if the data cannot. Interoperable means shared vocabularies and references that qualify what a field points at. Reusable means a clear license or usage rule, provenance, and enough domain context for someone outside the original team.

Culture is the part tools cannot install. If documentation is treated as unpaid overtime, FAIR stays a poster. Stewardship culture makes definitions, identifiers, and provenance part of “done,” the same way tests are part of done for software. ELIXIR’s research data-steward guidance is one public picture of that day-to-day support work.""",
    "howItWorks": """1. Give priority datasets a persistent identifier and a metadata record that points at it.
2. Publish the access path, including the auth path if the data is restricted.
3. Use shared vocabularies for fields that will leave the team.
4. Attach a license or an internal usage rule, plus a short provenance statement.
5. Reward the work in planning and performance conversations so it is staffed.
6. Apply FAIR proportionally: a regulated customer extract is not an open science dump, but its internal metadata can still be findable and precise.""",
    "example": """A textile lab collaborating with Northline publishes a durability dataset. The dataset gets a DOI, a metadata record with methods and units, and a CC-style license the counsel team has actually looked at. Restricted customer purchase data behind the study is not in the deposit. Internally, the product steward still writes provenance for fiber tests on the Harbor Beanie—method, lab, date—so a later merchant can reuse the attribute without calling the person who left. The culture change is small and concrete: the launch checklist has a provenance line, and the work is in the steward’s objectives.""",
    "pitfalls": [
      "Treating FAIR as a sticker awarded without identifiers or licenses.",
      "Opening data that should stay controlled in the name of the Accessible principle.",
      "Internal slang codes that no external partner can decode, then calling the feed interoperable.",
      "Expecting stewards to document after hours with no change to priorities.",
      "Forgetting provenance, so reuse is legally allowed and scientifically or commercially unsafe.",
    ],
    "checklist": [
      "Priority assets have identifiers and indexed metadata.",
      "Access paths match sensitivity, including authentication where needed.",
      "Shared terms or vocabularies are used on outbound data.",
      "A usage rule and provenance are attached.",
      "Steward time for documentation is explicit.",
      "FAIR is not used as a reason to skip privacy or security decisions.",
    ],
    "seeAlso": ["qm-fair-depth", "dama-metadata", "roles-trio"],
    "extraQuiz": [
      {
        "q": "FAIR’s Accessible principle is compatible with:",
        "choices": [
          "Authentication and authorization for data that should not be open",
          "Only fully anonymous public dumps",
          "Deleting metadata when data is restricted",
          "Banning persistent identifiers",
        ],
        "answerIndex": 0,
        "explain": "Accessible describes a standard retrieval path, not a requirement to make everything public.",
      },
      {
        "q": "Stewardship culture shows up when:",
        "choices": [
          "Documentation and provenance are staffed as part of finishing the work",
          "FAIR is a poster beside an empty glossary",
          "Only departing employees write definitions",
          "Licenses are chosen by whoever uploads a file last",
        ],
        "answerIndex": 0,
        "explain": "Culture is visible in what the workflow treats as complete.",
      },
    ],
  },
  "qm-dimensions": {
    "concept": """Quality dimensions are the lenses for “fit for use.” Six show up in almost every practitioner introduction, including IBM’s public overview: accuracy, completeness, consistency, timeliness, validity, and uniqueness. They are not a scoreboard for its own sake. Each one catches a different way a decision can go wrong.

Accuracy asks whether the value matches the real world or a trusted source. Completeness asks whether required values and records are present. Consistency asks whether the same fact agrees with itself across systems or rows. Timeliness asks whether the data is current enough when the decision happens. Validity asks whether values obey formats, ranges, and lists. Uniqueness asks whether one real-world entity has been stored as several, or several have been crushed into one.

Organizations add lenses—precision, relevance, integrity—when a decision needs them. The beginner’s mistake is to argue about the list instead of applying four of them to a critical field this week. A future birth date fails validity and probably accuracy. A color spelled three ways fails consistency and validity. A duplicate Maya fails uniqueness. A price updated last month fails timeliness if the channel refreshes hourly.""",
    "howItWorks": """1. Pick a critical field and a decision that uses it.
2. Write one rule per dimension that actually applies. Not every dimension binds every field.
3. Define the population (active styles, new customers) so the denominator is stable.
4. Measure a baseline before you set a target.
5. Separate validity (the value is legal) from accuracy (the value is true).
6. Track the few rules in the same place so a single record can fail more than one dimension without confusing the report.""",
    "example": """On active Northline styles, fiber content is complete when a percentage is present, valid when it matches the percentage pattern and sums sensibly, and accurate when it matches the mill document. Color is valid only if it hits the reference list exactly, so “charcol” fails validity even if a human can guess. The same SKU on web and in the PIM must show the same price (consistency) as of the last hour (timeliness). Customer matching measures uniqueness: one person, one golden id.""",
    "pitfalls": [
      "Calling every defect “accuracy” and hiding the fix path.",
      "A completeness target with no statement of which fields are required.",
      "Treating a valid code as proof the fact is true.",
      "Measuring the whole warehouse instead of the population the decision uses.",
      "Uniqueness projects that merge on a weak key and create a worse accuracy problem.",
    ],
    "checklist": [
      "The six common dimensions can be explained with an example each.",
      "Critical fields have explicit rules, not a vague “high quality” goal.",
      "The measured population is defined.",
      "Validity and accuracy are not used as synonyms.",
      "Targets have an owner.",
      "A record can fail more than one rule and the report still makes sense.",
    ],
    "seeAlso": ["dama-quality", "qm-measure", "mdm-match-merge"],
    "extraQuiz": [
      {
        "q": "Two systems show different prices for the same SKU at the same moment. The primary dimension is:",
        "choices": [
          "Consistency",
          "Uniqueness of the database vendor",
          "Findability",
          "A licensing problem only",
        ],
        "answerIndex": 0,
        "explain": "The same fact disagrees with itself. That is consistency. Timeliness may also be involved if one feed is late.",
      },
      {
        "q": "A value that follows the format rules can still fail accuracy when:",
        "choices": [
          "It does not match the trusted real-world source",
          "It is non-null",
          "It uses a standard code list",
          "It was loaded by a pipeline",
        ],
        "answerIndex": 0,
        "explain": "Validity is conformance. Accuracy is truth against a trusted reference.",
      },
    ],
  },
  "qm-measure": {
    "concept": """Dimensions become a program when they are measured, monitored, and used to change a source process. Profiling comes first: you cannot set an honest threshold until you have seen the nulls, the outliers, and the duplicates. Then the owner of the decision picks critical data elements and a service level. Automation watches the rule. Humans fix causes.

Upstream fixes beat downstream scrubbing. If addresses are incomplete because the form hides the postal code on mobile, cleansing the warehouse every night trains the organization to tolerate a broken form. Monitoring still matters after the fix, or the form will regress.

Report trends to the same forum that funds the work. A quality score that never reaches the council becomes a private worry for the steward. Pair the score with cost or consequence: listings rejected, hours spent reconciling, duplicates in the call center. USGS-style lifecycle guidance treats managing quality as continuous for the same reason—the measure is part of operations, not a closing slide.""",
    "howItWorks": """1. Profile the critical elements and publish the baseline.
2. Set thresholds with the owner, including severity (block, warn, or log).
3. Implement checks in the pipeline or the mastering workflow.
4. Open a task to a named role when a threshold breaks.
5. Prefer a source change. Track defect rate before and after that change.
6. Review a short trend in the governance cadence and retire checks that do not change decisions.""",
    "example": """Address completeness for shippable customers baselines at 86 percent. The owner sets 98 percent for new accounts and a warning under 95 percent for the whole active base. The form is changed so postal code is required, and the nightly check keeps watching. Completeness for new accounts reaches 99 percent in three weeks. The steward does not run a permanent manual cleanse. A separate duplicate-rate check on customer email goes to the match queue rather than to a silent SQL update.""",
    "pitfalls": [
      "Thresholds copied from a benchmark that does not match your population.",
      "Alerts that page nobody, or page everybody so they are muted.",
      "Downstream patches with no ticket back to the source team.",
      "A single blended score that hides a failing critical field inside healthy trivia.",
      "Stopping measurement the week after launch.",
    ],
    "checklist": [
      "A baseline exists before the target is announced.",
      "Each rule has severity and a routed owner.",
      "Checks run without a person remembering to start them.",
      "Source fixes are preferred, and the before/after is visible.",
      "The council or domain huddle sees the trend.",
      "Blended scores can be opened into dimensions and fields.",
    ],
    "seeAlso": ["qm-dimensions", "gov-metrics", "dama-quality"],
    "extraQuiz": [
      {
        "q": "Profiling is done before a target so that:",
        "choices": [
          "The threshold reflects the actual data, not an imagined ideal",
          "Measurement can be skipped",
          "All defects are automatically fixed",
          "Owners do not need to be involved",
        ],
        "answerIndex": 0,
        "explain": "A target without a baseline is a slogan.",
      },
      {
        "q": "The best long-term response to a repeating defect is usually:",
        "choices": [
          "Change the upstream process and keep the monitor in place",
          "Hide the column in the report",
          "Lower the threshold until the alert stops",
          "Export the bad rows to a desktop and edit them forever",
        ],
        "answerIndex": 0,
        "explain": "Prevention plus continued monitoring is the loop.",
      },
    ],
  },
  "qm-metadata-types": {
    "concept": """Not all metadata answers the same question. Business metadata says what the data means in the organization’s language: glossary definitions, certified metrics, ownership. Technical metadata says how it is shaped and moved: schemas, types, jobs, locations. Operational metadata says how the last runs behaved: freshness, volumes, failures, duration. Governance metadata says how it must be handled: classification, retention, consent flags, certification.

A catalog that stops at technical metadata leaves a user staring at column names. A glossary that never links to columns drifts. Operational metadata that nobody displays is how a stale table keeps a green checkmark from last year. Governance tags that controls do not read are decoration.

You do not need a perfect taxonomy on day one. You need, for critical assets, one business definition, one technical binding, one freshness signal, and one handling tag. The four types are a checklist against shallowness.""",
    "howItWorks": """1. For a critical asset, write the business definition and the owner (business metadata).
2. Bind it to the physical field or file and the job that produces it (technical).
3. Show last success and volume or row counts (operational).
4. Tag classification, retention, and whether it is certified (governance).
5. Store the links so a change in one type forces a look at the others.
6. Ask a new analyst to find and correctly use the asset using only the catalog. Fix whatever they could not see.""",
    "example": """“Active loyalty customer” is business metadata: the glossary sentence and the metric owner. Technically it is a view in the warehouse bound to CRM fields. Operationally the view refreshes at 05:10 and yesterday’s run counted 1.2 million rows. Governance metadata says the output is internal, contains personal data, and is certified for the board pack. A new analyst can choose it over a similarly named sandbox view because the certification tag is visible.""",
    "pitfalls": [
      "Harvesting schemas and calling the project finished.",
      "Definitions with no field bindings.",
      "Freshness stored only in a job log no catalog user can see.",
      "Classification in a spreadsheet that is not joined to the asset.",
      "Four unlinked tools, one per metadata type, that disagree.",
    ],
    "checklist": [
      "You can sort a metadata item into business, technical, operational, or governance.",
      "Critical assets have all four, even if the tooling is simple.",
      "Definitions link to fields.",
      "Freshness is visible to consumers.",
      "Handling tags are stored with the asset.",
      "A newcomer test has been run on at least one important asset.",
    ],
    "seeAlso": ["dama-metadata", "qm-lineage-catalog", "gov-policies"],
    "extraQuiz": [
      {
        "q": "A job’s last success time and rows written are:",
        "choices": [
          "Operational metadata",
          "A substitute for a business definition",
          "Reference data",
          "A golden record",
        ],
        "answerIndex": 0,
        "explain": "Run history and volume describe behavior, which is operational metadata.",
      },
      {
        "q": "Governance metadata includes items such as:",
        "choices": [
          "Classification, retention, and certification",
          "Only the column’s integer width",
          "The on-call rota",
          "Dashboard color palettes",
        ],
        "answerIndex": 0,
        "explain": "Handling rules are metadata, not a separate universe from the catalog.",
      },
    ],
  },
  "qm-lineage-catalog": {
    "concept": """A catalog is how people find data without asking in a channel. Lineage is how they learn whether they should trust it and what will break if it changes. Together they are the discovery layer of metadata management. FAIR findability depends on metadata registered in a searchable resource; a catalog is the enterprise version of that idea, with access control attached so findability does not become exposure.

Impact analysis is lineage used forward. Before you rename a customer id or tighten a fiber rule, you list the pipelines, extracts, and reports in the blast radius and you talk to their owners. Reverse lineage answers “why does this number look like that?” Both directions fail if lineage is a drawing someone made once.

Discovery without governance is a risk. The catalog should show classification and the access path, not hand over rows to anyone who can search. Pair every “I found it” with “I am allowed to open it.”""",
    "howItWorks": """1. Inventory critical assets in a catalog with owners and definitions, not only table names.
2. Collect lineage from jobs and transforms for those assets, and refresh it when jobs change.
3. Require an impact check before changes to critical fields.
4. Show freshness and certification next to search results so ranking is not only popularity.
5. Enforce permissions in the catalog itself.
6. Pick one disputed metric and one proposed change as drills; if lineage cannot answer, fix the graph before adding more sources.""",
    "example": """A steward searches “loyalty tier” and finds legacy_loyalty_tier, its owner, its classification, and a lineage graph into two campaign tools and one finance extract. The retirement plan names those three consumers and a date. Separately, a merchant challenges the Harbor Beanie margin. Reverse lineage shows the cost field, the PIM price, and a currency conversion job. The dispute takes an hour, not a week. A contractor without the pricing role can see that the cost column exists and cannot preview the values.""",
    "pitfalls": [
      "A catalog of table names with no owners, so search returns mysteries.",
      "Lineage that stops at the warehouse and hides the operational source.",
      "Impact analysis done by memory.",
      "Search results that preview sensitive values to anyone logged in.",
      "A one-time lineage project that is not tied to the deployment of jobs.",
    ],
    "checklist": [
      "Critical assets are searchable with owner and definition.",
      "Lineage covers source to consumer for those assets.",
      "Change tickets on critical fields include an impact note.",
      "Catalog permissions match data permissions.",
      "Freshness or certification is visible in search.",
      "A drill has proven the graph on a real question.",
    ],
    "seeAlso": ["dama-metadata", "dama-integration", "qm-fair-depth"],
    "extraQuiz": [
      {
        "q": "Impact analysis uses lineage to answer:",
        "choices": [
          "What will break or change if we alter this upstream field?",
          "Which font the catalog uses",
          "Whether the data is ethically collected, by itself",
          "How many meetings the team held",
        ],
        "answerIndex": 0,
        "explain": "Forward lineage is the blast radius of a change.",
      },
      {
        "q": "A catalog supports FAIR-style findability when:",
        "choices": [
          "Rich metadata is indexed and searchable, with access controls still enforced",
          "Only file paths are listed, with no definitions",
          "Anyone can download every column",
          "Metadata is kept in private email",
        ],
        "answerIndex": 0,
        "explain": "Findability is indexed metadata. It does not require dropping access control.",
      },
    ],
  },
  "qm-fair-depth": {
    "concept": """FAIR is a set of guiding principles for humans and machines, not a certificate you paste on a dataset. The GO FAIR Foundation lists sub-principles under Findable, Accessible, Interoperable, and Reusable. Applying them in practice means choosing the ones that match the asset and doing those thoroughly.

Findable, in practice, is a persistent identifier, rich metadata, and a searchable registration of that metadata. Accessible, in practice, is a standard protocol, possibly with auth, and metadata that survives even when the data is gone or closed. Interoperable, in practice, is shared vocabularies and qualified references to other data. Reusable, in practice, is a license or usage rule, provenance, and domain standards.

Proportionality matters. A public research table can aim at all four in the open. An internal customer master can still be findable to authorized staff, precise in its codes, and documented for reuse inside policy. Pretending those are the same publication is how teams either overshare or give up. USGS and university lifecycle guidance sit comfortably next to FAIR: describe as you go, share on purpose, keep provenance.""",
    "howItWorks": """1. Score the dataset honestly against F, A, I, and R. Write the gap in a sentence each.
2. Assign a persistent identifier or an internal durable id, and keep the metadata record linked.
3. Document the retrieval protocol and the auth requirements.
4. Replace local slang with a community or enterprise vocabulary where the data crosses a boundary.
5. Attach license or usage terms and a provenance note: how it was produced, by whom, with what limits.
6. Re-score after the gaps close. Stop when the remaining gaps are accepted risks, not forgotten ones.""",
    "example": """The lab’s textile durability set is not FAIR on day one: files are named final_v7.csv, units live in a slide, and there is no license. The team mints a DOI, writes a metadata record with methods and a controlled vocabulary for test type, publishes via a repository protocol, and adds a license plus a provenance statement that names the instrument and the excluded customer-level data. A later Northline analyst reuses the fiber-test method internally because the provenance is specific enough to trust. They do not copy the repository’s open license onto customer records.""",
    "pitfalls": [
      "Claiming FAIR because the data is in a spreadsheet on a shared drive.",
      "A DOI with thin metadata, which is a persistent pointer to a mystery.",
      "Open publication of personal or contractual data to satisfy Accessible.",
      "Local codes with no mapping, described as “we will explain if someone asks.”",
      "A license that counsel has not seen, or no license at all.",
    ],
    "checklist": [
      "Each FAIR letter has a concrete gap or a concrete implementation for the asset.",
      "The identifier resolves to metadata.",
      "The access protocol matches sensitivity.",
      "Outbound fields use shared vocabularies or an explicit mapping.",
      "License or usage terms and provenance are attached.",
      "Remaining gaps are accepted in writing.",
    ],
    "seeAlso": ["roles-fair-culture", "qm-lineage-catalog", "lc-share"],
    "extraQuiz": [
      {
        "q": "A persistent identifier helps Findability only if:",
        "choices": [
          "Rich metadata is linked to it and indexed where searchers look",
          "The identifier is secret",
          "The file is renamed weekly",
          "Provenance is deleted",
        ],
        "answerIndex": 0,
        "explain": "Identifiers and metadata work as a pair in the FAIR sub-principles.",
      },
      {
        "q": "Reusability is weakened when:",
        "choices": [
          "There is no usage license and no provenance",
          "A community vocabulary is used",
          "The retrieval protocol is documented",
          "Authentication protects a restricted file",
        ],
        "answerIndex": 0,
        "explain": "Reuse depends on permission and on knowing how the data was made.",
      },
    ],
  },
  "mdm-master": {
    "concept": """Master data is the data an organization agrees to share about the core entities it uses again and again: customers, products, suppliers, locations, and sometimes employees or accounts. IBM’s public introduction to master data management contrasts this with transactions, which happen in volume and cite the master entities, and with reference data, which classifies them. Master data changes more slowly than orders, but it is not static. People move. Products retire. Suppliers merge.

Without a managed master, every system invents a local copy. The website, the store, and the warehouse then disagree about who Maya is and what the Harbor Beanie contains. MDM is the discipline—and often the technology—for creating a consistent, stewarded view and publishing it outward. The trusted view is frequently called a golden record. It is built; it does not appear because a product was licensed.

MDM fails when it is treated as a database project. Matching rules, survivorship, ownership, and a queue for exceptions are the actual system. The platform is how you enforce them at a volume people cannot reconcile by hand.""",
    "howItWorks": """1. Choose domains that are shared and painful. Do not master everything.
2. Name the owner, steward, and system of record for the domain.
3. Define the identity: what makes two records the same entity.
4. Define how attributes survive when sources disagree.
5. Publish the mastered view to consumers and stop those consumers from editing it locally.
6. Operate a queue for the cases rules should not decide alone.""",
    "example": """Northline masters customer and product first. The CRM remains the place consent is captured, but the customer master publishes the golden id that ecommerce, the store system, and the warehouse all store on their transactions. Local nickname fields can exist; legal name and email survivorship cannot be redefined per channel. The Harbor Beanie’s style record is mastered in the PIM and subscribed to everywhere a customer can buy it. Order lines stay transactional and point at those ids.""",
    "pitfalls": [
      "Declaring every table master data.",
      "A golden record nobody is allowed to unmerge.",
      "Consumers that “correct” the master locally and drift the same day.",
      "Starting with a tool selection before identity rules exist.",
      "Ignoring relationships, so you master people and not the households or accounts your process actually uses.",
    ],
    "checklist": [
      "The domain is genuinely shared across processes.",
      "Owner, steward, and system of record are named.",
      "Identity rules are written.",
      "Survivorship is written per attribute, not as “trust system X for everything.”",
      "Consumers subscribe instead of reinventing.",
      "Exceptions have a human path.",
    ],
    "seeAlso": ["mdm-golden", "mdm-reference", "dama-refmdm"],
    "extraQuiz": [
      {
        "q": "Which item is the best candidate for master data?",
        "choices": [
          "The shared customer profile used by commerce, stores, and service",
          "A single website click event",
          "A temporary campaign extract",
          "An application log line",
        ],
        "answerIndex": 0,
        "explain": "Master data is the reusable entity, not the high-volume event that cites it.",
      },
      {
        "q": "MDM is more than a tool because:",
        "choices": [
          "Identity, survivorship, and stewardship have to be decided and operated",
          "Databases cannot store customers",
          "Reference data is illegal",
          "Transactions should be edited by hand",
        ],
        "answerIndex": 0,
        "explain": "The practice and the operating model are the larger part of the discipline.",
      },
    ],
  },
  "mdm-reference": {
    "concept": """Reference data is the controlled vocabulary other data must use: country codes, currencies, sizes, colors, statuses, units, and taxonomies. It is usually smaller and simpler than a customer or a product, and it is still capable of breaking every report if two systems disagree. IBM’s MDM overview and DAMA’s reference-and-master area both treat these lists as governed assets, not as dropdown trivia.

Good reference data has an owner, a source of truth, effective dates, and a distribution path. When a color is renamed or a country code is corrected, subscribers receive the change. History remains interpretable: last year’s orders still mean the code that was valid then. Free text is the enemy of validity. “Charcol,” “Charcoal,” and “CH” are three worlds.

Reference data is also how master data stays clean. A customer address uses a country list. A product uses a fiber vocabulary and a size scale. RDM (reference data management) is the discipline of keeping those lists honest. It is related to MDM and it is not the same project.""",
    "howItWorks": """1. Inventory the lists that classify critical fields.
2. Pick a governing source and an owner for each list.
3. Ban free text in the fields those lists govern.
4. Version the list and effective-date the values that change meaning.
5. Distribute updates to every subscriber, including spreadsheets you cannot quite kill yet.
6. Measure invalid values flowing in, and reject them at the boundary.""",
    "example": """Northline’s color list is owned by design operations. Charcoal is the only approved value for that colorway; the acquire job rejects “charcol.” Size scales differ by category and are reference data too: hats use one scale, shoes another. Country codes on Maya’s address come from the same list the tax engine uses, so “UK” and “GB” do not both survive. When a color is retired, the code stays in the list as inactive so historical SKUs still resolve, and new styles cannot select it.""",
    "pitfalls": [
      "A dropdown in the UI and a different list in the warehouse.",
      "Overwriting a code’s meaning without an effective date.",
      "No owner, so the list changes when someone edits a seed script.",
      "Treating reference data as too minor for change control.",
      "Using reference lists as a junk drawer for attributes that are really master data.",
    ],
    "checklist": [
      "Critical classifiers have one governing list.",
      "Each list has an owner and a change path.",
      "Values can be inactivated without destroying history.",
      "Subscribers receive updates.",
      "Ingress validates against the list.",
      "The list is not secretly different in each channel.",
    ],
    "seeAlso": ["mdm-vs-rdm", "qm-dimensions", "lc-create"],
    "extraQuiz": [
      {
        "q": "Inactivating a retired color code instead of deleting it helps because:",
        "choices": [
          "Historical products still resolve, while new products cannot choose it",
          "History should be rewritten",
          "Validation becomes impossible",
          "Owners are no longer needed",
        ],
        "answerIndex": 0,
        "explain": "Effective dating and inactivation keep meaning stable over time.",
      },
      {
        "q": "Reference data management primarily governs:",
        "choices": [
          "Controlled codes and classifications used to validate other data",
          "The full customer golden record",
          "Clickstream events",
          "Backup tapes",
        ],
        "answerIndex": 0,
        "explain": "Lists and codes are the scope. Entities are MDM’s scope.",
      },
    ],
  },
  "mdm-vs-rdm": {
    "concept": """Master data management and reference data management are neighbors. RDM governs code sets and classifications. MDM governs shared business entities, their attributes, and their relationships. They meet constantly: a mastered customer uses reference country and status codes; a mastered product uses reference color, size, and unit codes. Confusing the two produces either an overbuilt “MDM” project for a dropdown or an underbuilt spreadsheet for customer identity.

The hard problems differ. RDM struggles with versioning, effective dating, and getting every subscriber onto the new list. MDM struggles with matching, survivorship, hierarchy, and unmerge. Both need owners, stewards, quality rules, and change control. Neither replaces transactional systems. Orders, invoices, and clicks cite the entities and the codes; they are not mastered by pretending they are customers.

Choose the discipline that matches the noun. If the noun is a list of allowed values, start with RDM. If the noun is a real-world party or thing that many processes must recognize as the same thing, start with MDM—and still use reference data inside it.""",
    "howItWorks": """1. Sort a candidate asset: controlled list, master entity, or transaction.
2. If it is a list, assign RDM practices: owner, version, distribution, validation.
3. If it is an entity, assign MDM practices: identity, survivorship, publish, exception queue.
4. Note where the entity depends on lists, and govern those lists first if they are chaotic.
5. Do not force one tool metaphor onto both if the operating model differs.
6. Explain the split to sponsors in one slide so funding does not blur it.""",
    "example": """A sponsor asks for “MDM of colors and customers” in one project. The team splits the ask. Color is RDM: one list, one owner, rejection of unknown values, inactivation rather than deletion. Customer is MDM: match rules, a golden record, survivorship for email and legal name, a steward queue. The customer project consumes the country list from RDM. The sponsor still gets one roadmap, with two different definitions of done. Survivorship rules appear only on the customer side, because a color code does not need a golden record assembled from conflicting people.""",
    "pitfalls": [
      "One project plan that uses “MDM” for every list and every entity.",
      "Perfect color codes and no identity resolution, then wondering why customers are duplicated.",
      "A golden record whose country values are still free text.",
      "Effective-dating customers as if they were code lists, or match-scoring code lists as if they were people.",
      "Skipping stewardship on the grounds that “it is only reference data.”",
    ],
    "checklist": [
      "You can classify a new request as RDM, MDM, or transactional.",
      "Lists and entities have different definitions of done.",
      "Master entities validate against governed lists.",
      "Sponsors can hear the difference in one minute.",
      "Both have owners even though the work is different.",
      "Survivorship and match rules are not mistakenly applied to simple code sets.",
    ],
    "seeAlso": ["mdm-master", "mdm-reference", "mdm-golden"],
    "extraQuiz": [
      {
        "q": "A size scale used to validate a SKU is:",
        "choices": [
          "Reference data",
          "A customer golden record",
          "A transaction",
          "Operational metadata about a job run",
        ],
        "answerIndex": 0,
        "explain": "Scales and codes classify other data. That is reference data.",
      },
    ],
  },
}

NEW_MODULES = [
  {
    "id": "mdm-golden",
    "title": "Golden Record and Survivorship",
    "summary": "A golden record is the trusted view of one real-world entity, assembled attribute by attribute when sources disagree. Survivorship rules decide which value wins, and stewards decide when the rules should not.",
    "keyPoints": [
      "A golden record is a managed representation, not a magical row that appears when a tool is installed.",
      "Survivorship is per attribute: the winning email can come from a different source than the winning address.",
      "Trust changes over time; “most recently verified” is often safer than “always trust system A.”",
      "Every contributing source key is kept in a crosswalk so you can explain and undo.",
      "Rules handle the common case. A steward handles low-confidence and high-impact conflicts.",
    ],
    "visualHint": "diagram",
    "minutes": 16,
    "sources": [
      {"title": "What is Master Data Management? – IBM", "url": "https://www.ibm.com/think/topics/master-data-management"},
      {"title": "DAMA-DMBOK Framework – Core Knowledge Areas", "url": "https://www.damadmbok.org/copy-of-about-dama-dmbok"},
    ],
    "quiz": [
      {
        "q": "Survivorship rules exist to:",
        "choices": [
          "Choose which source value wins for an attribute when records are merged",
          "Delete all but one source system",
          "Replace reference data",
          "Hide lineage from stewards",
        ],
        "answerIndex": 0,
        "explain": "Survivorship is the attribute-level decision inside a golden record.",
      },
      {
        "q": "Why keep source keys on a golden record?",
        "choices": [
          "So you can explain where values came from and unmerge or trace back",
          "So the golden record can be edited differently in every channel",
          "Keys are optional decoration",
          "To avoid assigning an owner",
        ],
        "answerIndex": 0,
        "explain": "The crosswalk is what makes a golden record auditable and reversible.",
      },
      {
        "q": "A sensible survivorship pattern for email is often:",
        "choices": [
          "Prefer the most recently verified email, not an arbitrary older system",
          "Always prefer the oldest value forever",
          "Concatenate every email into one field",
          "Let each channel pick a different winner and publish all of them as official",
        ],
        "answerIndex": 0,
        "explain": "Trust is contextual. Recency of verification is a common, explicit rule.",
      },
    ],
    "lesson": {
      "concept": """A golden record is the organization’s chosen representation of one real-world entity, built from one or more sources. IBM’s public MDM material uses the term for this reconciled view. It is not automatically the row from the oldest system, and it is not a copy-paste of whichever source shouted last. It is a set of attribute values chosen by rules the owner has approved, plus the links back to every source that contributed.

Survivorship is that choice, attribute by attribute. Legal name might survive from the store system because identity was checked there. Email might survive from the web profile because it was verified yesterday. Marketing consent survives from the system that recorded the timestamp, not from a guess. A single “source rank” for the whole record is tempting and usually wrong, because trust is not uniform across fields.

The golden record is what you publish. Source systems may keep their local nuances. What they may not do is publish a competing official name or consent flag. Stewards exist because some conflicts are too close or too consequential for a rule: two strong identity documents, a hyphenated name, a shared inbox. The rule’s job is to clear the obvious cases and to show its work on the rest.""",
      "howItWorks": """1. Define the entity and the attributes that are in the golden view. Leave local-only trivia out.
2. For each attribute, write a survivorship rule: trusted source, most recently verified, non-null preference, or steward decision.
3. Keep a crosswalk of source system plus source key for every contributor.
4. Store enough lineage to answer “why did this value win?”
5. Publish one golden view downstream.
6. Send low-confidence or rule-conflict cases to a steward, and record the override as its own kind of source.""",
      "example": """Two records might be Maya Chen. The web profile has email maya.chen@example.com verified today, ship-to in Portland, and no legal-name check. The store card has legal name “Maya C. Chen,” an older email, and a loyalty id. Survivorship takes legal name from the store (identity-checked), email from the web (most recently verified), and address from the most recent shipped order after it passes validation. Both source keys hang off golden id C-104422. A steward sees the explanation and confirms. Commerce stops creating a third Maya.""",
      "pitfalls": [
        "One source always wins for every attribute, so verified new facts never arrive.",
        "No crosswalk, which makes unmerge a fantasy.",
        "Publishing the golden record while channels continue to edit the same attributes locally.",
        "Hiding the losing values so nobody can see the conflict later.",
        "Letting a steward override become tribal knowledge instead of a recorded rule exception.",
      ],
      "checklist": [
        "Each golden attribute has a written survivorship rule.",
        "Source keys are retained.",
        "The winning value can be explained.",
        "Low-confidence cases reach a steward.",
        "Overrides are recorded.",
        "Downstream systems consume the golden view for official attributes.",
      ],
      "seeAlso": ["mdm-match-merge", "mdm-master", "mdm-ops"],
    },
  },
  {
    "id": "mdm-match-merge",
    "title": "Matching, Linking, Merge, and Unmerge",
    "summary": "Matching decides whether two records are the same entity. Merging builds one golden view from them. Unmerge is the required undo when a match was wrong.",
    "keyPoints": [
      "Deterministic matching uses exact keys. Probabilistic matching uses several clues and a score.",
      "Thresholds split the world into auto-link, steward review, and no match.",
      "A household phone or a shared address is a weak key and a classic false-positive.",
      "Merge keeps a crosswalk. It does not throw away the contributing identifiers.",
      "Unmerge is a designed operation, practiced before the first painful mistake.",
    ],
    "visualHint": "flow",
    "minutes": 16,
    "sources": [
      {"title": "What is Master Data Management? – IBM", "url": "https://www.ibm.com/think/topics/master-data-management"},
      {"title": "DAMA-DMBOK Framework – Core Knowledge Areas", "url": "https://www.damadmbok.org/copy-of-about-dama-dmbok"},
    ],
    "quiz": [
      {
        "q": "A match score in a gray band between auto-merge and ignore should generally:",
        "choices": [
          "Go to a steward queue",
          "Auto-merge to keep the queue empty",
          "Delete both records",
          "Be ignored forever with no log",
        ],
        "answerIndex": 0,
        "explain": "Thresholds exist so uncertain matches get a person.",
      },
      {
        "q": "Unmerge matters because:",
        "choices": [
          "False matches happen, and the organization must be able to split records and repair consumers",
          "Golden records are never wrong",
          "Source keys should be discarded at merge time",
          "Stewards prefer irreversible actions",
        ],
        "answerIndex": 0,
        "explain": "A merge you cannot undo will eventually glue two people together permanently.",
      },
      {
        "q": "Which matching clue is the weakest by itself?",
        "choices": [
          "A shared household phone number",
          "A government identifier checked in store",
          "A verified email plus a matching loyalty id",
          "An exact persistent customer key",
        ],
        "answerIndex": 0,
        "explain": "Household and shared contact points create false positives. Strong unique keys do not.",
      },
    ],
    "lesson": {
      "concept": """Matching answers a narrow question: do these two records refer to the same real-world entity? Linking records the yes without necessarily collapsing every column yet. Merging applies survivorship and publishes one golden record. Unmerge reverses a bad yes. Teams that design only the happy merge discover the unmerge during an angry phone call.

Deterministic matches trust an exact shared key: the same loyalty id, the same verified government identifier. Probabilistic matches weigh clues—name similarity, email, address, phone—into a score. Scores need two thresholds. Above the high one, the rule may auto-link if policy allows. Below the low one, the records stay apart. Between them, a steward decides. Auto-merge on a medium score is how two strangers become one customer.

False positives and false negatives cost different things. Merging two people corrupts orders, consent, and privacy. Missing a duplicate creates a clumsy experience and muddy metrics. The thresholds encode that tradeoff, and they should be set with the owner, not left at a vendor default. Weak clues need a veto: same last name and same address are not enough when the address is a university or a family home.""",
      "howItWorks": """1. List deterministic keys and the probabilistic clues, and ban clues that are only shared context.
2. Set auto, review, and no-match thresholds with examples the owner has seen.
3. On a match, write a link and a crosswalk before survivorship runs.
4. Apply survivorship to build or update the golden record.
5. Notify downstream systems with the golden id, not with a silent overwrite of history.
6. Provide an unmerge that splits the golden record, restores source identities, and flags consumers to repair.""",
      "example": """A job proposes that web user Maya Chen and store card “Maya C. Chen” match at 0.91 because of email and name, with addresses in the same city. The auto threshold is 0.97 and the review floor is 0.80, so a steward gets the pair. She confirms and merges to C-104422. A week later a second proposal matches Maya to her brother because they share a household phone and a last name, score 0.84. The steward rejects it. The rejection is stored so the same pair does not return tomorrow. The unmerge procedure is documented and has been drilled on a test pair, even though this merge stands.""",
      "pitfalls": [
        "Auto-merging everything above a vendor’s default score.",
        "Matching on household phone, shared email, or company address alone.",
        "Discarding source keys at merge time.",
        "No memory of steward rejections, so the same false pair returns every night.",
        "No unmerge path, or an unmerge that does not tell downstream systems.",
      ],
      "checklist": [
        "Deterministic and probabilistic clues are listed, with weak clues called out.",
        "Two thresholds exist, plus a review queue.",
        "The owner has seen false-positive and false-negative examples.",
        "Merges keep a crosswalk.",
        "Rejections are remembered.",
        "Unmerge has been tested.",
      ],
      "seeAlso": ["mdm-golden", "qm-dimensions", "mdm-ops"],
    },
  },
  {
    "id": "mdm-hierarchy",
    "title": "Hierarchies for Product, Location, and Organization",
    "summary": "Hierarchies roll facts up—SKU to style to class, store to region, team to legal entity—and they must be effective-dated so history does not rewrite itself.",
    "keyPoints": [
      "A hierarchy is master data about relationships, not a chart someone keeps in a slide.",
      "The same entity can sit in more than one hierarchy (selling versus reporting).",
      "Effective dates let a store change region next quarter without changing last quarter’s sales.",
      "Ragged trees are normal; pretending every branch has the same depth creates fake nodes.",
      "Rollups are only as trustworthy as the leaf identifiers they join to.",
    ],
    "visualHint": "diagram",
    "minutes": 15,
    "sources": [
      {"title": "What is Master Data Management? – IBM", "url": "https://www.ibm.com/think/topics/master-data-management"},
      {"title": "DAMA-DMBOK Framework – Core Knowledge Areas", "url": "https://www.damadmbok.org/copy-of-about-dama-dmbok"},
    ],
    "quiz": [
      {
        "q": "Effective dating a hierarchy matters when:",
        "choices": [
          "You need last period’s rollup to stay stable after a reorganization",
          "Hierarchies never change",
          "Every product has exactly one attribute",
          "Reports should change history each time a region is renamed",
        ],
        "answerIndex": 0,
        "explain": "Effective dates separate “true now” from “true then.”",
      },
      {
        "q": "A SKU rolling to a style rolling to a class is an example of:",
        "choices": [
          "A product hierarchy",
          "A probabilistic match",
          "A privacy principle",
          "Operational job metadata",
        ],
        "answerIndex": 0,
        "explain": "Product hierarchies are how merchandising and finance agree on rollups.",
      },
      {
        "q": "Allowing two hierarchies for the same stores can be legitimate when:",
        "choices": [
          "Selling responsibility and financial reporting genuinely differ",
          "Nobody wants to document either one",
          "One of them is an unowned spreadsheet",
          "They contradict each other by accident",
        ],
        "answerIndex": 0,
        "explain": "Multiple hierarchies are valid if each has a purpose and an owner. Accidental duplicates are not.",
      },
    ],
    "lesson": {
      "concept": """Hierarchies describe how master entities contain or report to one another. A product hierarchy might run SKU → style → class → division. A location hierarchy might run store → district → region → country. An organization hierarchy might run team → brand → legal entity. Rollups for inventory, sales, and accountability all assume these trees are explicit data, not a picture in a quarterly deck.

One entity often belongs to more than one tree. A store can report to a regional manager for selling and to a different group for real estate. Forcing those into a single parent “because the tool has one parent column” destroys one of the truths. Multiple hierarchies are allowed when each has a name, an owner, and a purpose. Unnamed extra trees in spreadsheets are just drift.

Change is constant. Styles move class. Stores move region. Effective dates, or an equivalent history, keep last season’s Harbor Beanie sales in last season’s class. Rewriting history whenever the tree changes makes every prior metric unreproducible. Ragged hierarchies—branches that skip a level—are normal in real catalogs and should be modeled honestly.""",
      "howItWorks": """1. Name each hierarchy and the question it answers.
2. Define the node types and which levels are required versus optional.
3. Assign an owner who may approve a move.
4. Store parent relationships with effective dates.
5. Join facts (sales, inventory) to the leaf id, and roll up through the hierarchy version that was effective at the fact’s date.
6. Publish the hierarchy as master data so reports do not each invent a parent map.""",
      "example": """The Harbor Beanie style sits under class Headwear and division Accessories in the selling hierarchy. Finance uses the same style under a merchandise division that groups cold-weather goods differently. Both trees are mastered, named, and owned. On 1 March a store moves from North region to Central. January sales remain in North because the relationship is effective-dated. A planning spreadsheet that had its own parent column is retired so the next reorganization does not fork the truth.""",
      "pitfalls": [
        "A single unofficial spreadsheet as the hierarchy.",
        "Rewriting historical parents in place.",
        "One parent column for two different business relationships.",
        "Fake intermediate nodes invented only to make a tree balanced.",
        "Leaf identifiers in the hierarchy that do not match the product or location master.",
      ],
      "checklist": [
        "Each hierarchy has a purpose and an owner.",
        "Parent relationships are effective-dated.",
        "Facts roll up using the version effective at the fact date.",
        "More than one hierarchy is allowed only when each is named.",
        "Leaf ids match the master entities.",
        "Shadow spreadsheets are not maintained in parallel.",
      ],
      "seeAlso": ["dama-model", "mdm-master", "dama-dwbi"],
    },
  },
  {
    "id": "mdm-ops",
    "title": "Day-2 Stewardship Operations",
    "summary": "After the golden record exists, the work is a queue: match exceptions, failed validations, change requests, and a rhythm that keeps duplicates and delays visible.",
    "keyPoints": [
      "Day-2 operations are the product. The initial load is only the opening.",
      "Queues need severity, aging, and a person who owns the backlog.",
      "Change control covers survivorship rules and reference lists, not only code.",
      "Metrics that matter: duplicate rate, exception aging, override rate, time to publish.",
      "A rhythm—daily queue, weekly domain huddle, monthly council numbers—keeps MDM from becoming a project that ended.",
    ],
    "visualHint": "cards",
    "minutes": 15,
    "sources": [
      {"title": "What is Master Data Management? – IBM", "url": "https://www.ibm.com/think/topics/master-data-management"},
      {"title": "Data Owners vs Data Stewards vs Data Custodians – DataSunrise", "url": "https://www.datasunrise.com/knowledge-center/data-owners-vs-data-stewards-vs-data-custodians/"},
      {"title": "DAMA DMBOK Framework Guide (Atlan)", "url": "https://atlan.com/dama-dmbok-framework/"},
    ],
    "quiz": [
      {
        "q": "A healthy MDM queue shows:",
        "choices": [
          "Aging and an owner, so exceptions cannot sit unseen",
          "Only a count of records loaded on day one",
          "Steward overrides with no reason codes",
          "Every task assigned to the entire company",
        ],
        "answerIndex": 0,
        "explain": "Operations are visible work with age and accountability.",
      },
      {
        "q": "Changing a survivorship rule should go through:",
        "choices": [
          "Change control with the owner’s approval and a note on expected impact",
          "An unlogged edit in production by whoever is on call",
          "A silent vendor default reset",
          "Deletion of the golden record",
        ],
        "answerIndex": 0,
        "explain": "Rules are policy. They change on purpose.",
      },
      {
        "q": "Override rate is a useful day-2 metric because a rising rate can mean:",
        "choices": [
          "The rules no longer match reality and need review, or stewards lack guidance",
          "The program is finished",
          "Reference data is unnecessary",
          "Hierarchies should be deleted",
        ],
        "answerIndex": 0,
        "explain": "Overrides are signal. A spike means the rule or the training is drifting.",
      },
    ],
    "lesson": {
      "concept": """Master data is an operation. The weekend you load history is day one. Day two is a suspected duplicate, a color code the mill invented, a hierarchy move, and a customer who was merged with a sibling. Stewardship operations are the queues, the service levels, and the metrics that make those events routine instead of heroic.

A queue without aging is a pile. Each task needs a type (match review, validation failure, change request, unmerge), a severity, a created time, and a single assignee role. Service levels belong to the owner: high-severity suspected false merges in one business day, ordinary validations in five. The custodian keeps the workflow running. The steward works the items. The owner watches aging and grants rule changes.

Metrics connect the queue to the council. Duplicate rate in the domain, median age of open exceptions, percent of merges that are steward overrides, and time to publish a new style or a new customer are enough. If overrides climb, the survivorship or match rules are wrong or the training is. If time to publish climbs, the queue is starved of people. MDM software does not staff itself.""",
      "howItWorks": """1. Define task types and the role that works each type.
2. Set aging targets with the owner.
3. Require a reason code on every override or rejection.
4. Put survivorship, match thresholds, and reference-list edits under change control.
5. Review the queue daily at steward level and weekly with the owner.
6. Take a one-page metric to the council monthly and tie it to a staffing or rule decision.""",
      "example": """Monday’s customer queue at Northline has 14 items. Three are match proposals in the gray band, including a household-phone pair the steward rejects with reason “shared contact point.” One is an unmerge drill residue being closed. The product queue has six styles blocked on fiber, aged two days, inside the five-day target. The weekly huddle notes that override rate on email survivorship jumped after a new verification vendor; the owner approves a rule tweak through change control. The monthly council slide shows duplicate rate down and time-to-publish flat, so they do not add headcount, but they do fund the rule change.""",
      "pitfalls": [
        "No queue—exceptions arrive by email and vanish.",
        "Targets with no aging visibility.",
        "Overrides without reason codes, so the rules never learn.",
        "Rule changes made in production outside change control.",
        "Metrics that count tasks closed and hide tasks aging.",
        "Declaring the MDM project done at go-live.",
      ],
      "checklist": [
        "Task types, assignees, and aging targets exist.",
        "The queue is the only front door for exceptions.",
        "Overrides capture a reason.",
        "Rule and reference changes use change control.",
        "A weekly domain rhythm reviews aging.",
        "A small set of outcome metrics reaches the council.",
      ],
      "seeAlso": ["roles-trio", "gov-metrics", "mdm-match-merge"],
    },
  },
]
