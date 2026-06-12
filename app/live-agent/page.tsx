import Link from "next/link";

const demos = [
  {
    href: "/live-agent/medispa",
    name: "MediSpa Receptionist",
    description:
      "Books appointments, answers treatment questions, and greets clients.",
  },
  {
    href: "/live-agent/insurance",
    name: "Insurance Intake",
    description: "Collect customer details for insurance quotes.",
  },
];

export default function LiveAgentIndexPage() {
  return (
    <section className="min-h-screen px-6 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Live Voice AI Demos</h1>
        <p className="text-gray-500">Choose a demo to start a live conversation.</p>
      </div>

      <div className="max-w-3xl mx-auto grid gap-6 sm:grid-cols-2">
        {demos.map((demo) => (
          <Link
            key={demo.href}
            href={demo.href}
            className="block rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md hover:border-gray-300"
          >
            <h2 className="text-xl font-semibold mb-2">{demo.name}</h2>
            <p className="text-sm text-gray-500">{demo.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
