import { FC, useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search, ChevronDown, ChevronRight, ExternalLink } from "lucide-react"

interface SectionItem {
  id: string
  title: string
  icon?: string
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
        className="fixed top-20 left-4 z-50 lg:hidden p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white border-r border-gray-200 z-40 transition-transform duration-200 overflow-hidden flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {filteredFamilies.map((family) => {
              const isExpanded = isSearching || expandedFamilies.has(family.family)
              return (
                <div key={family.family}>
                  <button
                    onClick={() => !isSearching && toggleFamily(family.family)}
                    className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors rounded-md hover:bg-gray-50"
                  >
                    {family.family}
                    {isSearching ? null : (
                      isExpanded
                        ? <ChevronDown className="w-3.5 h-3.5" />
                        : <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="mt-0.5 ml-1 space-y-0.5">
                      {family.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-md transition-colors text-sm ${
                            active === item.id
                              ? 'bg-gray-100 text-gray-900 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link
            href="/community"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Community
          </Link>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default DocsLayout
