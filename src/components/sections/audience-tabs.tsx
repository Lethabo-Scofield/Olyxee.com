"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { id: 'developers', label: 'For developers' },
  { id: 'teams', label: 'For teams' },
  { id: 'businesses', label: 'For businesses' },
] as const;

export type ActiveAudienceTab = typeof tabs[number]['id'];

interface AudienceTabsProps {
  activeTab: ActiveAudienceTab;
  setActiveTab: (tab: ActiveAudienceTab) => void;
}

const AudienceTabs = ({ activeTab, setActiveTab }: AudienceTabsProps) => {
  return (
    <div className="bg-background py-10">
      <div className="flex justify-center gap-10" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative border-none bg-transparent pb-3 text-xl font-semibold transition-colors duration-300 focus:outline-none",
              activeTab === tab.id
                ? "text-text-primary"
                : "text-muted hover:text-muted-foreground"
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-text-magenta"
                layoutId="audience-tab-underline"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AudienceTabs;