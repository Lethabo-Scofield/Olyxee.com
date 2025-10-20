import { FC, useState, useEffect } from "react"
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

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : ""
  }, [sidebarOpen])

  return (
    <div className="flex min-h-screen bg-white text-gray-700">

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-bold text-gray-900">Docs</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        <div className="p-6">
          <h1 className="text-gray-900 font-extrabold text-2xl mb-6 hidden lg:block">Olyxee Docs</h1>
          <nav className="flex flex-col gap-6">
            {families.map((family) => (
              <div key={family.family}>
                <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2">{family.family}</h3>
                <div className="flex flex-col space-y-1">
                  {family.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelect(item.id)
                        setSidebarOpen(false)
                      }}
                      className={`text-left px-3 py-2 rounded-md transition-colors font-medium ${active === item.id
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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

      {/* Mobile toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 px-6 py-8 lg:ml-0 overflow-y-auto">{children}</main>
    </div>
  )
}

export default DocsLayout
