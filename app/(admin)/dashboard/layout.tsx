import Sidebar from "@/app/components/Sidebar"
import ReactQueryClientProvider from "@/utils/react-query-provider"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Prz | Dashboard',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryClientProvider>
            <div className="flex">
                <Sidebar />
                <div className="w-10/12 h-screen overflow-y-auto">
                    {children}
                </div>
            </div>
        </ReactQueryClientProvider>
    )
}