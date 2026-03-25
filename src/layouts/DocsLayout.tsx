import { FC, useState } from "react"
import { Menu, X } from "lucide-react"

interface SectionItem {
  id: string
  title: string
}

interface SectionFamily {
  family: string
  items: SectionItem[]
}

interface DocsLayoutProps {
  families: SectionFamily[]
  active: string
  onSelect: (id: string) => void
  children: React.ReactNode
}

const DocsLayout: FC<DocsLayoutProps> = ({ families, active, onSelect, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSelect = (id: string) => {
    onSelect(id)
    setSidebarOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-white text-gray-700" style={{ paddingTop: '4rem' }}>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-20 left-4 z-50 lg:hidden p-2 bg-white border border-gray-200 rounded-lg shadow-md"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed lg:static top-16 left-0 h-[calc(100%-4rem)] w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-200 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <nav className="flex flex-col gap-6">
            {families.map((family) => (
              <div key={family.family}>
                <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2">{family.family}</h3>
                <div className="flex flex-col space-y-1">
                  {family.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`text-left px-3 py-2 rounded-md transition-colors font-medium ${active === item.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto w-full">{children}</main>
    </div>
  )
}

export default DocsLayout
