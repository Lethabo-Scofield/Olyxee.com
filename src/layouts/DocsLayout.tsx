import { FC, useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, ChevronRight, ExternalLink, Menu, X } from "lucide-react"

interface DocsTab {
  id: string
  label: string
}

interface DocsSideItem {
  id: string
  title: string
  badge?: string
}

interface DocsSideSection {
  heading: string
  items: DocsSideItem[]
}

interface DocsLayoutProps {
  tabs: DocsTab[]
  activeTab: string
  onTabChange: (id: string) => void
  sideNav?: DocsSideSection[]
  activePage?: string
  onPageChange?: (id: string) => void
  children: React.ReactNode
}

const DocsLayout: FC<DocsLayoutProps> = ({ tabs, activeTab, onTabChange, sideNav, activePage, onPageChange, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !searchFocused) {
        e.preventDefault()
        const input = document.querySelector<HTMLInputElement>('[data-docs-search]')
        input?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [searchFocused])

  const filteredSideNav = searchQuery
    ? sideNav?.map(s => ({
        ...s,
        items: s.items.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()))
      }))
    : sideNav

  const hasResults = filteredSideNav?.some(s => s.items.length > 0) ?? false

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '60px' }}>
      <div className="border-b border-gray-200 bg-white sticky top-[60px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide" ref={tabsRef}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { onTabChange(tab.id); setMobileMenuOpen(false) }}
                  className={`relative py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-green-600'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  data-docs-search
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-52 pl-9 pr-8 py-1.5 text-sm bg-gray-50 border rounded-lg focus:outline-none focus:bg-white transition-all text-gray-900 placeholder-gray-400 ${searchFocused ? 'border-green-500 ring-1 ring-green-500/20 w-72' : 'border-gray-200'}`}
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5 font-mono">
                  /
                </kbd>
              </div>
            </div>

            {sideNav && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {sideNav && (
            <>
              <aside className={`w-60 flex-shrink-0 border-r border-gray-100 hidden md:block`}>
                <nav className="sticky top-[108px] h-[calc(100vh-108px)] overflow-y-auto py-6 px-4">
                  {!hasResults && searchQuery ? (
                    <p className="text-sm text-gray-400 px-2 py-4">No results for &ldquo;{searchQuery}&rdquo;</p>
                  ) : filteredSideNav?.map(section => section.items.length > 0 ? (
                    <div key={section.heading} className="mb-6">
                      <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">{section.heading}</h4>
                      <div className="space-y-px">
                        {section.items.map(item => (
                          <button
                            key={item.id}
                            onClick={() => onPageChange?.(item.id)}
                            className={`w-full text-left px-2 py-1.5 rounded-md text-[13px] transition-colors flex items-center justify-between ${
                              activePage === item.id
                                ? 'text-green-700 bg-green-50/80 font-medium'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            {item.title}
                            {item.badge && (
                              <span className={`text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full ${
                                activePage === item.id ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                              }`}>{item.badge}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null)}

                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <Link href="/community" className="flex items-center gap-2 px-2 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> Community
                    </Link>
                    <a href="https://github.com/Olyxee" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> GitHub
                    </a>
                  </div>
                </nav>
              </aside>

              {mobileMenuOpen && (
                <>
                  <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
                  <div className="fixed top-[108px] left-0 right-0 bottom-0 bg-white z-50 md:hidden overflow-y-auto p-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    {!hasResults && searchQuery ? (
                      <p className="text-sm text-gray-400 px-2 py-4">No results for &ldquo;{searchQuery}&rdquo;</p>
                    ) : filteredSideNav?.filter(s => s.items.length > 0).map(section => (
                      <div key={section.heading} className="mb-5">
                        <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">{section.heading}</h4>
                        {section.items.map(item => (
                          <button
                            key={item.id}
                            onClick={() => { onPageChange?.(item.id); setMobileMenuOpen(false) }}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                              activePage === item.id ? 'text-green-700 bg-green-50 font-medium' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {item.title}
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default DocsLayout
