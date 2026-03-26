import { FC, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
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
    <div className="flex min-h-screen bg-white" style={{ paddingTop: '4rem' }}>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-20 left-4 z-50 lg:hidden p-2 bg-white border border-neutral-200 rounded-xl shadow-sm hover:bg-neutral-50 transition-colors"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <X className="w-5 h-5 text-neutral-600" /> : <Menu className="w-5 h-5 text-neutral-600" />}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-[280px] bg-neutral-50/80 border-r border-neutral-200/60 z-40 transition-transform duration-200 overflow-hidden flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 pb-3">
          <div className="flex items-center gap-2.5 mb-4 px-1">
            <Image src="/Logo/Olyxee_Logo.png" alt="Olyxee" width={20} height={20} />
            <span className="text-sm font-semibold text-neutral-900">Documentation</span>
            <span className="text-[10px] font-medium text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded-md border border-neutral-200 ml-auto">v1.0</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-[13px] bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/40 placeholder-neutral-400 transition-all text-neutral-900"
            />
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
                    className="flex items-center justify-between w-full px-2.5 py-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.08em] hover:text-neutral-600 transition-colors rounded-md"
                  >
                    {family.family}
                    {isSearching ? null : (
                      isExpanded
                        ? <ChevronDown className="w-3 h-3" />
                        : <ChevronRight className="w-3 h-3" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="mt-0.5 space-y-px">
                      {family.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item.id)}
                          className={`w-full text-left px-2.5 py-[7px] rounded-lg transition-all text-[13px] flex items-center justify-between group ${
                            active === item.id
                              ? 'bg-blue-50/80 text-blue-700 font-medium border border-blue-100/60'
                              : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/80'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {active === item.id && <span className="w-1 h-1 rounded-full bg-blue-500" />}
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                              item.badge === 'new' ? 'bg-blue-100 text-blue-600' : 'bg-neutral-100 text-neutral-500'
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

        <div className="p-3 border-t border-neutral-200/60 space-y-0.5">
          <Link
            href="/community"
            className="flex items-center gap-2 px-2.5 py-2 text-[13px] text-neutral-500 hover:text-blue-600 rounded-lg hover:bg-white/80 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Community
          </Link>
          <a
            href="https://github.com/Olyxee"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2.5 py-2 text-[13px] text-neutral-500 hover:text-blue-600 rounded-lg hover:bg-white/80 transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default DocsLayout
