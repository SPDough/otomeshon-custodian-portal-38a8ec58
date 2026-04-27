import type { ProcedureDocument } from "@/types/vellum";

export const mockDocument: ProcedureDocument = {
  id: "doc-apac-eq-01-2026-04-24",
  title: "Daily NAV Validation",
  fund_code: "APAC-EQ-01",
  as_of_date: "2026-04-24",
  status: "awaiting_review",
  cells: [
    {
      cell_id: "cell-1",
      position: 1,
      cell_role: "narrative",
      label: "Overview",
      body:
        "Daily NAV validation for APAC-EQ-01 as of 2026-04-24. This procedure verifies pricing source coverage across the portfolio and confirms the day-over-day NAV movement falls within the 2.0% tolerance threshold defined in the fund's valuation policy.",
    },
    {
      cell_id: "cell-2",
      position: 2,
      cell_role: "result",
      label: "Pricing coverage",
      status: "pass",
      summary:
        "Pricing source coverage check passed: 247 of 247 securities priced from primary pricing sources.",
      metrics: [
        { label: "Securities priced", value: "247 / 247" },
        { label: "Stale prices (>1d)", value: "0" },
        { label: "Manual overrides", value: "0" },
      ],
    },
    {
      cell_id: "cell-3",
      position: 3,
      cell_role: "narrative",
      label: "Tolerance checks",
      body:
        "Comparing today's calculated NAV per share to the prior business day. The fund's valuation policy requires escalation when the absolute day-over-day move exceeds 2.0%.",
    },
    {
      cell_id: "cell-4",
      position: 4,
      cell_role: "result",
      label: "NAV move",
      status: "breach",
      summary:
        "Day-over-day NAV move of 4.20% exceeds the 2.00% tolerance threshold.",
      metrics: [
        { label: "NAV per share (T-1)", value: "USD 12.4583" },
        { label: "NAV per share (T)", value: "USD 12.9819" },
        { label: "Move", value: "+4.20%" },
        { label: "Threshold", value: "±2.00%" },
      ],
    },
    {
      cell_id: "cell-5",
      position: 5,
      cell_role: "exception",
      label: "Tolerance breach",
      severity: "high",
      description:
        "NAV move of +4.20% on APAC-EQ-01 exceeds the 2.00% policy tolerance. Controller decision required before signoff. Largest contributors: TSMC (+8.1%), Samsung Electronics (+5.4%), driven by overnight earnings announcements.",
      linked_result_cell_id: "cell-4",
      remediation_options: [
        {
          id: "accept-with-rationale",
          label: "Accept move with documented rationale",
          description:
            "Confirm the move is explained by market events and proceed to signoff. Rationale will be attached to the audit record.",
        },
        {
          id: "escalate-pm",
          label: "Escalate to portfolio manager",
          description:
            "Pause the NAV publication and request PM confirmation of overnight market moves before proceeding.",
        },
        {
          id: "rerun-pricing",
          label: "Reject and rerun pricing",
          description:
            "Reject the current run and re-fetch closing prices from secondary sources before recomputing NAV.",
        },
      ],
    },
    {
      cell_id: "cell-6",
      position: 6,
      cell_role: "signoff",
      label: "Controller signoff",
      required_role: "Fund Controller",
    },
  ],
};
