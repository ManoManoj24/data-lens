# Data Lens — Mermaid Diagram Sketches

Use these as starting points for the site’s visual components. Map each sketch to modules via `visualHint` (`flow`, `wheel`, `diagram`, `cards`).

---

## 1) Unified data lifecycle flow (7 stages)

```mermaid
flowchart LR
  P[Plan] --> C[Create / Acquire]
  C --> S[Store / Manage]
  S --> U[Use / Process]
  U --> H[Share]
  H --> A[Archive]
  A --> D[Destroy]
  H -.->|reuse / collect again| C
  U -.->|iterate| U
```

**Teaching note:** Dashed edges show common non-linear paths (reuse and iterative analysis).

---

## 2) DAMA wheel (governance at center)

```mermaid
flowchart TB
  subgraph Wheel["DAMA-style knowledge areas"]
    DG((Data Governance))
    DA[Data Architecture]
    DM[Data Modeling & Design]
    DSO[Data Storage & Operations]
    DS[Data Security]
    DII[Data Integration & Interoperability]
    DC[Documents & Content]
    RMD[Reference & Master Data]
    DW[Data Warehousing & BI]
    MD[Metadata]
    DQ[Data Quality]
  end
  DG --- DA
  DG --- DM
  DG --- DSO
  DG --- DS
  DG --- DII
  DG --- DC
  DG --- RMD
  DG --- DW
  DG --- MD
  DG --- DQ
```

**Teaching note:** Hub-and-spoke emphasizes governance as coordinating center—not that other areas are optional.

---

## 3) Governance org: council / owner / steward / custodian

```mermaid
flowchart TB
  ES[Executive Sponsor / CDO]
  GC[Data Governance Council]
  DO[Data Owner - domain accountability]
  ST[Data Steward - definitions & quality]
  CU[Data Custodian - platforms & controls]
  ES --> GC
  GC --> DO
  DO --> ST
  ST --> CU
  DO -.->|escalations / standards| GC
```

**Teaching note:** Owners decide; stewards operationalize; custodians implement technical controls; council resolves cross-domain issues.

---

## 4) Plan → Destroy with cross-cuts (quality, security, metadata)

```mermaid
flowchart TB
  subgraph Stages["Lifecycle stages"]
    direction LR
    P[Plan] --> C[Create/Acquire] --> S[Store/Manage] --> U[Use/Process] --> H[Share] --> A[Archive] --> X[Destroy]
  end
  Q[Cross-cut: Data Quality]
  SEC[Cross-cut: Security / Privacy]
  META[Cross-cut: Metadata / Lineage]
  Q -.-> P
  Q -.-> C
  Q -.-> S
  Q -.-> U
  Q -.-> H
  Q -.-> A
  Q -.-> X
  SEC -.-> P
  SEC -.-> C
  SEC -.-> S
  SEC -.-> U
  SEC -.-> H
  SEC -.-> A
  SEC -.-> X
  META -.-> P
  META -.-> C
  META -.-> S
  META -.-> U
  META -.-> H
  META -.-> A
  META -.-> X
```

**Teaching note:** Matches USGS-style “cross-cutting elements” and Harvard/UW emphasis that controls and documentation are continuous.

---

## 5) Optional: compare three public models (cards → table visual)

```mermaid
flowchart TB
  subgraph UW["UW-style teaching spine"]
    U1[Plan] --> U2[Create] --> U3[Manage] --> U4[Use] --> U5[Share] --> U6[Reuse] --> U7[Destroy]
  end
  subgraph NIST["NIST RDaF 6 stages"]
    N1[Envision] --> N2[Plan] --> N3[Generate/Acquire] --> N4[Process/Analyze] --> N5[Share/Use/Reuse] --> N6[Preserve/Discard]
  end
  subgraph USGS["USGS SDL"]
    G1[Plan] --> G2[Acquire] --> G3[Process] --> G4[Analyze] --> G5[Preserve] --> G6[Publish/Share]
  end
  UW --> Lens[Data Lens 7-stage unified model]
  NIST --> Lens
  USGS --> Lens
```

---

## 6) Optional: MDM vs reference data

```mermaid
flowchart LR
  RD[Reference Data<br/>codes & classifications] --> MD[Master Data<br/>customers / products / locations]
  MD --> TX[Transactional & Analytical Uses]
  RD --> TX
```
