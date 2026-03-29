import { FC, useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search, ChevronDown, ChevronRight, ExternalLink, ArrowUpRight } from "lucide-react"

interface SectionItem {
  id: string
  title: string
  badge?: string
}

interface SectionFamily {
  family: string
  items: SectionItem[]
  defaultOpen?: boolean
}

interface DocsLayoutProps {
  families: SectionFamily[]
  active: string
  onSelect: (id: string) => void
  children: React.ReactNode
}

const DocsLayout: FC<DocsLayoutProps> = ({ families, active, onSelect, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(() => {
    const set = new Set<string>()
    families.forEach(f => {
      if (f.defaultOpen || f.items.some(i => i.id === active)) set.add(f.family)
    })
    return set
  })

  const toggleFamily = (family: string) => {
    setExpandedFamilies(prev => {
      const next = new Set(prev)
      if (next.has(family)) next.delete(family)
      else next.add(family)
      return next
    })
  }

  const handleSelect = (id: string) => {
    onSelect(id)
    setSidebarOpen(false)
  }

  useEffect(() => {
    families.forEach(f => {
      if (f.items.some(i => i.id === active)) {
        setExpandedFamilies(prev => new Set(prev).add(f.family))
      }
    })
  }, [active, families])

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [sidebarOpen])

  const isSearching = searchQuery.length > 0
  const filteredFamilies = isSearching
    ? families.map(f => ({
        ...f,
        items: f.items.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()))
      })).filter(f => f.items.length > 0)
    : families

  return (
    <div className="flex min-h-screen bg-white" style={{ paddingTop: '60px' }}>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-[76px] left-4 z-50 lg:hidden p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed lg:sticky top-[60px] left-0 h-[calc(100vh-60px)] w-[272px] bg-white border-r border-gray-100 z-40 transition-transform duration-200 overflow-hidden flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="px-4 pt-5 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full pl-10 pr-8 py-2 text-sm bg-gray-50 border rounded-lg focus:outline-none focus:bg-white transition-all text-gray-900 placeholder-gray-400 ${searchFocused ? 'border-green-500 ring-1 ring-green-500/20' : 'border-gray-200'}`}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5 font-mono hidden sm:inline-block">
              /
            </kbd>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          <div className="space-y-0.5">
            {filteredFamilies.map((family) => {
              const isExpanded = isSearching || expandedFamilies.has(family.family)
              return (
                <div key={family.family} className="mb-1">
                  <button
                    onClick={() => !isSearching && toggleFamily(family.family)}
                    className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors rounded-md"
                  >
                    {family.family}
                    {isSearching ? null : (
                      isExpanded
                        ? <ChevronDown className="w-3 h-3" />
                        : <ChevronRight className="w-3 h-3" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="space-y-px ml-1">
                      {family.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item.id)}
                          className={`w-full text-left px-3 py-[6px] rounded-md transition-all text-[13.5px] flex items-center justify-between ${
                            active === item.id
                              ? 'text-green-700 bg-green-50 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className={`text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded-full ${
                              active === item.id
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        <div className="px-3 py-3 border-t border-gray-100">
          <Link
            href="/community"
            className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Community
          </Link>
          <a
            href="https://github.com/Olyxee"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-y-auto pt-10 lg:pt-0">
        {children}
      </main>
    </div>
  )
}

export default DocsLayout
