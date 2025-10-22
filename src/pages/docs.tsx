import { useState, FC } from "react";
import "../app/globals.css";
import Overview from "../components/docs/sections/Overview";
import Concepts from "../components/docs/sections/Concepts";
import Guides from "../components/docs/sections/Guides";
import Resources from "../components/docs/sections/Resources";
import LiveAssistant from "../components/docs/sections/LiveAssistant";
import DocsLayout from "../layouts/DocsLayout";
import Header from '../components/header';

interface Section {
  id: string;
  title: string;
  component: FC;
  family: string;
}

const sections: Section[] = [
  { id: "overview", title: "Overview", component: Overview, family: "Getting Started" },
  { id: "concepts", title: "Key Concepts", component: Concepts, family: "Concepts" },
  { id: "guides", title: "Guides & Tutorials", component: Guides, family: "Guides" },
  { id: "resources", title: "Resources", component: Resources, family: "Resources" },
];

const Docs: FC = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const ActiveComponent = sections.find(sec => sec.id === activeSection)?.component;

  const families = Array.from(
    sections.reduce((map, sec) => {
      if (!map.has(sec.family)) map.set(sec.family, []);
      map.get(sec.family)!.push({ id: sec.id, title: sec.title });
      return map;
    }, new Map<string, { id: string; title: string }[]>())
  ).map(([family, items]) => ({ family, items }));

  return (
    <>
      <div>
        <Header />
        <DocsLayout families={families} active={activeSection} onSelect={setActiveSection}>
          {ActiveComponent && <ActiveComponent />}
          <LiveAssistant />
        </DocsLayout>
      </div>
    </>

  );
};

export default Docs;
