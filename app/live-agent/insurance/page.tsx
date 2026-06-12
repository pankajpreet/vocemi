import { Metadata } from "next";
import AgentDemo from "../AgentDemo";

export const metadata: Metadata = {
  title: "Insurance Intake",
  robots: { index: false, follow: false },
};

export default function InsurancePage() {
  return (
    <AgentDemo
      agentId="agent_3301kpvzvx69fpvs19vspd54m2zh"
      name="Insurance Intake"
      description="Collect customer details for insurance quotes."
    />
  );
}
