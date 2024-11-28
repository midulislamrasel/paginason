import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/providers/AuthProvider'
import SocketProvider from '@/providers/SocketProvider'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Modern Blog',
  description: 'A modern blog built with Next.js and friends',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SocketProvider>
            <Toaster position="top-center" />
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  )
}