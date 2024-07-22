import ReactQueryClientProvider from "@/utils/react-query-provider"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Prz | Dashboard',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryClientProvider>
            <div className="bg-gray-200">
                {children}
            </div>
        </ReactQueryClientProvider>
    )
}