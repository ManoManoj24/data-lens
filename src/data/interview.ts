export type InterviewCard = {
  id: string;
  theme: string;
  prompt: string;
  answer: string;
};

export const interviewCards: InterviewCard[] = [
  {
    id: "lifecycle-map",
    theme: "Lifecycle",
    prompt:
      "An interviewer asks: “What is a data lifecycle, and why isn’t it just a backup schedule?” Answer in a way a hiring manager can picture.",
    answer:
      "It is a shared map of what happens to data from the decision to create it through use, sharing, archive, and destruction. Stages loop. The point is to name purpose, ownership, and end-of-life before copies spread. A backup schedule is only one control inside storage, not the map.",
  },
  {
    id: "minimize",
    theme: "Plan",
    prompt:
      "Marketing wants five extra fields on a loyalty form “in case a model needs them.” What do you say, and what do you ask for?",
    answer:
      "Ask which decision each field changes. If nobody can name one, do not collect it. Minimization is a planning choice: data you never capture cannot be breached or retained by mistake. Offer to revisit a field when a real use and a retention rule exist. This is a design habit, not legal advice.",
  },
  {
    id: "system-of-record",
    theme: "Store",
    prompt:
      "The PIM says the beanie is $48. A buyer’s spreadsheet says $42, and the store is selling $42. What is broken, and what do you do first?",
    answer:
      "Custody is broken: a working file became a rival source of truth. Name the PIM as the system of record, stop edits in the spreadsheet, republish from the certified feed, and delete the stray copy. Do not “fix” the price only in the store database or you grow a third master.",
  },
  {
    id: "archive-destroy",
    theme: "End of life",
    prompt:
      "A customer closes an account. Someone says “delete everything so we are safe.” What do you split before any job runs?",
    answer:
      "Split by clock and by hold. Marketing attributes may be due for destruction. Order facts may still sit on a finance retention schedule. A legal hold stops both. Destruction has to cover known copies, not only the easiest row, and it needs a log. Archive is the other fork: keep what must stay readable.",
  },
  {
    id: "governance-not-tool",
    theme: "Governance",
    prompt:
      "A sponsor says, “We bought a catalog, so governance is done.” How do you respond without insulting the purchase?",
    answer:
      "The catalog can record decisions. It cannot make them. Governance is who may approve a definition, an access rule, or an exception, and where that choice is logged. Ask which decision changed last month because of the program. If the answer is none, the tool is ahead of the operating model.",
  },
  {
    id: "one-accountable",
    theme: "RACI",
    prompt:
      "Your RACI for retiring a customer attribute has the steward, the owner, the custodian, and the CDO all marked Accountable. What is wrong, and how would you mark it?",
    answer:
      "Four A’s means nobody owns the outcome. A sound pattern is owner Accountable, steward Responsible for the analysis and glossary change, custodian Consulted on the technical drop, CDO Informed. Consulted people speak before the decision. Informed people hear it after.",
  },
  {
    id: "policy-stack",
    theme: "Policy",
    prompt:
      "Give a one-minute example of policy, standard, and procedure using product content.",
    answer:
      "Policy: only certified attributes may be published to a channel. Standard: fiber must be a percentage, and color must come from the reference list. Procedure: the PIM workflow blocks the certified flag until those fields pass, and the feed reads only that flag. If you cannot test it, it is still a slogan.",
  },
  {
    id: "birth-date",
    theme: "Quality",
    prompt:
      "A birth date is stored as a future year. Which quality dimension fails first, and what else might be wrong?",
    answer:
      "Validity fails first: the value breaks a rule about possible dates. It may also be inaccurate if it does not match the person. Do not call every defect “accuracy.” The dimension tells you whether to fix a rule, a source, a duplicate, or a late pipeline.",
  },
  {
    id: "upstream",
    theme: "Quality",
    prompt:
      "Addresses are incomplete every night. An analyst offers to patch the warehouse extract before the board pack. What is the better long-term move?",
    answer:
      "Fix the capture form so the required postal code cannot be skipped, then keep the monitor. A downstream patch trains the organization to tolerate the broken source. Report the before-and-after to the owner so the threshold stays funded.",
  },
  {
    id: "survivorship",
    theme: "MDM",
    prompt:
      "Two records for Maya disagree. The store has an identity-checked legal name and an old email. The web has an email verified today. Should one system win the whole golden record?",
    answer:
      "No. Survivorship is per attribute. Legal name can survive from the identity-checked store. Email can survive from the most recently verified web profile. Keep both source keys on a crosswalk so the choice is explainable and reversible. “Newest system wins everything” drops the checked name.",
  },
  {
    id: "household-phone",
    theme: "Match",
    prompt:
      "A match score of 0.84 is mostly a shared household phone and a shared last name. Auto-merge starts at 0.97. A manager wants the threshold lowered to clear the queue. What do you refuse?",
    answer:
      "Refuse the auto-merge. A household phone is context, not identity. The gray band belongs in a steward queue. Lowering the threshold to empty a queue glues the wrong people together, including consent. Staff the queue, or tighten weak clues. Do not delete both records to make the conflict vanish.",
  },
  {
    id: "reference-vs-master",
    theme: "Reference data",
    prompt:
      "A leader asks for “MDM of colors and of customers” as one project. How do you split the work?",
    answer:
      "Color is reference data: one owned list, validation at the door, inactivation instead of silent deletion so history still resolves. Customer is master data: identity, survivorship, a published golden id, and an exception queue. The customer record should use the country list. The definitions of done are different.",
  },
  {
    id: "fair-access",
    theme: "FAIR",
    prompt:
      "A researcher says FAIR means the dataset must be on the public internet with no login. What do you correct?",
    answer:
      "Accessible means a standard way to retrieve the data, with authentication when it should not be open. Metadata can stay findable even when the file is restricted. FAIR is not a reason to publish personal or contractual data. Reuse still needs a license and provenance, or strangers cannot tell whether the numbers apply to them.",
  },
  {
    id: "lineage-rename",
    theme: "Metadata",
    prompt:
      "You are about to rename a customer id used by campaigns and finance. What do you look up before the change window, and why?",
    answer:
      "Forward lineage: which jobs, extracts, and reports read the field. Impact analysis is the blast radius. Also name the owner. A catalog of table names without lineage makes the rename a Friday surprise. Reverse lineage is the other direction: why a number on a chart looks wrong.",
  },
  {
    id: "least-privilege",
    theme: "Share",
    prompt:
      "A teammate wants the full customer table emailed before a weekend sale. Give the alternative in one breath.",
    answer:
      "Give a named person or service an expiring feed with only the fields the campaign is allowed to use, and only rows where consent says yes. Sharing is a consumer, a purpose, a field list, and a clock. An attachment is an unowned copy you will not be able to destroy later.",
  },
];
