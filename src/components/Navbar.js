'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            Modern Blog
          </Link>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/posts/new"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  New Post
                </Link>
                <div className="flex items-center space-x-2">
                  <img
                    src={session.user.image || '/default-avatar.png'}
                    alt={session.user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}