import React from "react";

export interface DocsNavItem {
  id: string;
  title: string;
}

export interface DocsNavGroup {
  heading: string;
  items: DocsNavItem[];
}

export interface DocsTab {
  id: string;
  label: string;
}

interface DocsLayoutProps {
  tabs: DocsTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  sideNav?: DocsNavGroup[];
  activePage: string;
  onPageChange: (id: string) => void;
  children: React.ReactNode;
}

export default function DocsLayout({
  tabs,
  activeTab,
  onTabChange,
  sideNav,
  activePage,
  onPageChange,
  children,
}: DocsLayoutProps) {
  const hasTabs = tabs && tabs.length > 0;
  const hasSideNav = sideNav && sideNav.length > 0;

  return (
    <div className="min-h-screen bg-white pt-24 sm:pt-28">
      {hasTabs && (
        <div className="sticky top-0 z-30 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <nav className="flex items-center justify-center gap-1 sm:gap-2">
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onTabChange(tab.id)}
                    className={`relative px-4 py-4 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-neutral-900"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-neutral-900" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {hasSideNav ? (
          <div className="flex gap-10">
            <aside className="hidden lg:block w-60 shrink-0 py-10">
              <div className="sticky top-28 space-y-8">
                {sideNav!.map((group) => (
                  <div key={group.heading}>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-3">
                      {group.heading}
                    </h4>
                    <ul className="space-y-1">
                      {group.items.map((item) => {
                        const isActive = item.id === activePage;
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => onPageChange(item.id)}
                              className={`block w-full text-left text-sm rounded-md px-3 py-1.5 transition-colors ${
                                isActive
                                  ? "bg-neutral-100 text-neutral-900 font-medium"
                                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                              }`}
                            >
                              {item.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        ) : (
          <main className="w-full">{children}</main>
        )}
      </div>
    </div>
  );
}
