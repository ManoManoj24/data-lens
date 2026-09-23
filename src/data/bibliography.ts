export type BibItem = {
  title: string;
  urls: { href: string; label?: string }[];
  note: string;
};

export type BibSection = {
  id: string;
  title: string;
  items: BibItem[];
};

export const bibliographyIntro =
  "Public pages consulted while writing original Data Lens summaries. Citations use title + URL. No substantial verbatim copying from DAMA-DMBOK PDFs/books or other paywalled chapter text.";

export const bibliography: BibSection[] = [
  {
    id: "lifecycle",
    title: "Data lifecycle",
    items: [
      {
        title: "Introduction to the Data Lifecycle – UW–Madison",
        urls: [{ href: "https://data.wisc.edu/data-literacy/lifecycle/" }],
        note: "Teaching-oriented lifecycle stages (Plan, Create, Manage, Use, Share, Collect/Reuse, Destroy) and related literacy concepts. Primary public comparator for the UW-style track content.",
      },
      {
        title: "The Data Lifecycle – Harvard University Information Security & Data Privacy",
        urls: [{ href: "https://privsec.harvard.edu/data-lifecycle" }],
        note: "Practical Plan → Create/Collect → Store → Use → Share → Archive/Destroy guidance with security and minimization emphasis.",
      },
      {
        title: "NIST Research Data Framework (RDaF)",
        urls: [
          {
            href: "https://www.nist.gov/programs-projects/research-data-framework-rdaf",
          },
        ],
        note: "Official project page describing six stages: Envision, Plan, Generate/Acquire, Process/Analyze, Share/Use/Reuse, Preserve/Discard.",
      },
      {
        title: "NIST RDaF Version 2.0 (Special Publication 1500-18r2)",
        urls: [
          {
            href: "https://www.nist.gov/publications/nist-research-data-framework-rdaf-version-20",
            label: "Publication page",
          },
          {
            href: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1500-18r2.pdf",
            label: "PDF",
          },
        ],
        note: "Authoritative stage naming and framework purpose for research data management.",
      },
      {
        title: "USGS Data Lifecycle",
        urls: [{ href: "https://www.usgs.gov/data-management/data-lifecycle" }],
        note: "Plan, Acquire, Process, Analyze, Preserve, Publish/Share plus cross-cuts (Describe, Manage Quality, Backup & Secure).",
      },
      {
        title: "USGS Science Data Lifecycle Model (Open-File Report 2013–1265)",
        urls: [
          { href: "https://pubs.usgs.gov/of/2013/1265/", label: "Report page" },
          {
            href: "https://pubs.usgs.gov/of/2013/1265/pdf/of2013-1265.pdf",
            label: "PDF",
          },
        ],
        note: "Public USGS report defining the Science Data Lifecycle Model used in comparison modules.",
      },
    ],
  },
  {
    id: "dama",
    title: "DAMA-DMBOK and related overviews",
    items: [
      {
        title: "DAMA-DMBOK Framework – Core Knowledge Areas (damadmbok.org)",
        urls: [{ href: "https://www.damadmbok.org/copy-of-about-dama-dmbok" }],
        note: "Public listing of the 11 knowledge areas with short descriptions; used to keep knowledge-area names accurate while writing original learner text.",
      },
      {
        title: "DAMA DMBOK Framework Guide – Atlan",
        urls: [{ href: "https://atlan.com/dama-dmbok-framework/" }],
        note: "Public overview of the wheel, benefits, and how DMBOK relates to other frameworks (COBIT, DCAM, and others).",
      },
      {
        title: "DAMA DMBOK Revision – DAMA International",
        urls: [{ href: "https://dama.org/dama-dmbok-revision/" }],
        note: "Notes that the recent revision is a maintenance release; the knowledge-area structure remains the reference shape for teaching.",
      },
    ],
  },
  {
    id: "roles",
    title: "Roles and stewardship",
    items: [
      {
        title: "Data Owners vs Data Stewards vs Data Custodians – DataSunrise",
        urls: [
          {
            href: "https://www.datasunrise.com/knowledge-center/data-owners-vs-data-stewards-vs-data-custodians/",
          },
        ],
        note: "Clear public comparison of owner, steward, and custodian responsibilities.",
      },
      {
        title: "Your role: Data Steward – ELIXIR RDMkit",
        urls: [{ href: "https://rdmkit.elixir-europe.org/data_steward" }],
        note: "Research-data stewardship role patterns and FAIR-aligned support practices.",
      },
    ],
  },
  {
    id: "fair",
    title: "FAIR, privacy principles, quality, and MDM",
    items: [
      {
        title: "FAIR Guiding Principles – GO FAIR Foundation",
        urls: [{ href: "https://www.go-fair.org/fair-principles/" }],
        note: "Canonical Findable, Accessible, Interoperable, Reusable principles with sub-principles.",
      },
      {
        title: "Art. 5 GDPR – Principles relating to processing of personal data – GDPR.eu",
        urls: [{ href: "https://gdpr.eu/article-5-how-to-process-personal-data/" }],
        note: "High-level personal-data processing principles. Educational citation only; not legal advice.",
      },
      {
        title: "What Are Data Quality Dimensions? – IBM",
        urls: [{ href: "https://www.ibm.com/think/topics/data-quality-dimensions" }],
        note: "Widely taught six dimensions: accuracy, completeness, consistency, timeliness, validity, uniqueness.",
      },
      {
        title: "What is Master Data Management? – IBM",
        urls: [{ href: "https://www.ibm.com/think/topics/master-data-management" }],
        note: "Master versus reference versus other data types; golden records and the purpose of MDM.",
      },
    ],
  },
  {
    id: "frameworks",
    title: "Capability and IT governance frameworks",
    items: [
      {
        title: "DCAM Framework – EDM Council / EDM Association",
        urls: [{ href: "https://edmcouncil.org/frameworks/dcam/" }],
        note: "Public overview of DCAM as a data management capability assessment model. The full model is membership-gated; this pack uses only the high-level public description.",
      },
      {
        title: "COBIT – ISACA",
        urls: [{ href: "https://www.isaca.org/resources/cobit" }],
        note: "Public landing for COBIT as enterprise governance and management of information and technology.",
      },
    ],
  },
];

export const nonUseNotes = [
  "DAMA-DMBOK full PDFs and Technics Publications book chapters were not used as copy sources for module prose. Knowledge-area names and the hub-and-spoke structure come from the public overview pages listed above.",
  "DCAM detailed capability text is member-only; only the public overview page informed high-level mentions.",
  "CMMI and data management maturity are referenced at a high level in the glossary and governance lessons as a maturity-style companion idea. Learners should consult official materials for full models.",
  "ISO 8000 is named in the glossary at a high level only, without pasting standard text.",
];
