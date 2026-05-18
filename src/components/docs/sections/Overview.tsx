import { FC } from "react";
import { Rocket, Plug, MessageSquare, ShieldCheck } from "lucide-react";

interface OverviewProps {
  onNavigate?: (id: string) => void;
}

const Overview: FC<OverviewProps> = ({ onNavigate }) => {
  const cards = [
    { icon: Rocket, title: "Quickstart", description: "Connect your first tool and run a workflow in under 5 minutes.", id: "quickstart" },
    { icon: Plug, title: "Integrations", description: "Drive, Teams, SharePoint, Dropbox, and dozens more.", id: "integrations" },
    { icon: MessageSquare, title: "Writing requests", description: "Get the most out of plain-English prompts.", id: "prompts" },
    { icon: ShieldCheck, title: "Audit & compliance", description: "How tasks are assigned, logged, and reviewed.", id: "audit" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">Ordo Documentation</h2>
        <p className="text-gray-500 text-lg leading-relaxed">
          Learn how to plug Ordo into the tools you already use, write requests in plain English, and keep a clean audit trail of every action.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onNavigate?.(card.id)}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group text-left"
            >
              <Icon className="w-6 h-6 text-gray-700 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">{card.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
            </button>
          );
        })}
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">What is Ordo?</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Ordo is the workflow layer where work and AI finally agree. Instead of switching between half a dozen apps to file an expense, chase an approval, or update a sprint, you ask Ordo in plain English and it acts across every system you already use.
          </p>
          <p>
            Each request is broken into a clear plan, executed step by step, and logged with the who, what, and when. The result is the speed of an AI agent with the accountability your team and auditors actually need.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">How it works</h2>
        <div className="space-y-3">
          {[
            { title: "Plain-English requests", description: "Describe the outcome you want. Ordo translates it into a structured, reviewable plan before doing anything." },
            { title: "Connects to your stack", description: "Drive, Teams, SharePoint, Dropbox, ERPs, ticketing - Ordo plugs into the tools you already pay for, no new workflow builder required." },
            { title: "Coordinated execution", description: "Ordo runs the steps across systems, asks for approvals when needed, and follows through until the task is done." },
            { title: "Receipts on everything", description: "Every step is assigned, timestamped, and reviewable - designed for industries that can't afford black boxes." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-gray-900">{item.title}</span>
                <span className="text-gray-600">, {item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Where teams use it</h2>
        <p className="text-gray-700 mb-4">Ordo is built for operations that need both speed and a paper trail:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Finance & ops", "Compliance", "People & HR", "IT & support"].map((fw) => (
            <div key={fw} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-center text-sm font-medium text-gray-700">
              {fw}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Overview;
