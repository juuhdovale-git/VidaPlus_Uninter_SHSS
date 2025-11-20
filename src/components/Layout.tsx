import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden p-4 lg:p-6">
          <div className="max-w-7xl mx-auto w-full h-full overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
