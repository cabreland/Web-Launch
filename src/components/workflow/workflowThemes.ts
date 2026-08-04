export type AnimationStage = "completed" | "stalled" | "rebuilding" | "resolved";

export type WorkflowStep = {
  id: string;
  title: string;
  pendingDescription: string;
  activeDescription: string;
  completeDescription: string;
};

export type StageNarrative = {
  eyebrow: string;
  title: string;
  description: string;
  primaryMetric: { label: string; value: string };
  supportingMetrics: Array<{ label: string; value: string }>;
};

export type WorkflowScenario = {
  id: string;
  label: string;
  steps: WorkflowStep[];
  rebuildActions: string[];
  narratives: Record<AnimationStage, StageNarrative>;
};

export const multifamilyRevenueOperations: WorkflowScenario = {
  id: "multifamily-revenue-operations",
  label: "Revenue operations",
  steps: [
    {
      id: "job-completed",
      title: "Job completed",
      pendingDescription: "Waiting for field completion",
      activeDescription: "Unit 304 turnover completed",
      completeDescription: "Completion confirmed",
    },
    {
      id: "evidence",
      title: "Evidence captured",
      pendingDescription: "Waiting for receipts and photos",
      activeDescription: "Receipt in email · photos in text thread",
      completeDescription: "Photos, receipts, and labor attached",
    },
    {
      id: "reconciliation",
      title: "Costs reconciled",
      pendingDescription: "Waiting for complete job records",
      activeDescription: "Matching labor and materials",
      completeDescription: "Labor and materials confirmed",
    },
    {
      id: "invoice",
      title: "Invoice generated",
      pendingDescription: "Waiting for verified costs",
      activeDescription: "Preparing invoice package",
      completeDescription: "Invoice #10482 ready to send",
    },
    {
      id: "collection",
      title: "Payment follow-up activated",
      pendingDescription: "Waiting for invoice",
      activeDescription: "Updating AR and follow-up schedule",
      completeDescription: "AR dashboard and customer follow-up updated",
    },
  ],
  rebuildActions: [
    "Receipt matched to Unit 304",
    "Photos attached to job record",
    "Technician hours added",
    "Missing approval assigned",
    "Invoice package prepared",
  ],
  narratives: {
    completed: {
      eyebrow: "Work completed",
      title: "The work is finished.",
      description: "One completed property turn enters the revenue workflow.",
      primaryMetric: { label: "Work order", value: "Unit 304 complete" },
      supportingMetrics: [{ label: "Labor", value: "6.5 hours" }, { label: "Receipts", value: "4 submitted" }],
    },
    stalled: {
      eyebrow: "Revenue stalled",
      title: "The information needed to bill it is scattered.",
      description: "The job is done, but its evidence cannot reach finance as one complete record.",
      primaryMetric: { label: "Not yet billed", value: "$4,860" },
      supportingMetrics: [{ label: "Since completion", value: "11 days" }, { label: "Requirements", value: "3 missing" }],
    },
    rebuilding: {
      eyebrow: "Workflow rebuilt",
      title: "The missing handoffs are being connected.",
      description: "Web Launch matches the evidence, assigns the exception, and resumes the same job.",
      primaryMetric: { label: "Records connected", value: "4" },
      supportingMetrics: [{ label: "Exceptions", value: "1 assigned" }, { label: "Invoice", value: "Preparing" }],
    },
    resolved: {
      eyebrow: "Cash flow restored",
      title: "The completed job is moving toward collected cash.",
      description: "Billing and customer follow-up now begin on the same day the work is verified.",
      primaryMetric: { label: "Moved into active billing", value: "$4,860" },
      supportingMetrics: [{ label: "Invoice", value: "Ready" }, { label: "Follow-up", value: "Scheduled" }],
    },
  },
};
