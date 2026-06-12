import { Metadata } from "next";
import AgentDemo from "../AgentDemo";

export const metadata: Metadata = {
  title: "MediSpa Receptionist",
  robots: { index: false, follow: false },
};

export default function MediSpaPage() {
  return (
    <AgentDemo
      agentId="agent_6601ktj573qmfpbry50mamrm82dm"
      name="MediSpa Receptionist"
      description="Books appointments, answers treatment questions, and greets clients."
    />
  );
}
