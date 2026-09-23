export type Cheatsheet = {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  sourceNote: string;
};

export const cheatsheets: Cheatsheet[] = [
  {
    id: "lifecycle",
    title: "Data lifecycle",
    kicker: "Seven stages",
    summary: "Plan through destroy, plus the three cross-cuts that never turn off.",
    sourceNote:
      "Stage names are Data Lens’s teaching spine, aligned with public models from UW–Madison, NIST RDaF, USGS, and Harvard’s data lifecycle guide.",
  },
  {
    id: "dama",
    title: "DAMA wheel",
    kicker: "Eleven areas",
    summary: "Governance at the hub. The other areas still do their own work.",
    sourceNote:
      "Area names follow public DAMA-DMBOK overviews. The one-line jobs are original teaching text, not book excerpts.",
  },
  {
    id: "quality",
    title: "Quality dimensions",
    kicker: "Fit for use",
    summary: "Six lenses, and the question each one actually answers.",
    sourceNote:
      "The six dimensions match common public teaching, including IBM’s overview of data quality dimensions.",
  },
  {
    id: "raci",
    title: "Roles and RACI",
    kicker: "Who decides",
    summary: "Owner, steward, custodian, and one worked matrix.",
    sourceNote:
      "Role split follows public comparisons of owners, stewards, and custodians. The sample matrix is a Data Lens teaching pattern.",
  },
];
