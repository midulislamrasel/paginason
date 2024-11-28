'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const search = formData.get('search')
    
    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      if (search) {
        params.set('search', search)
      } else {
        params.delete('search')
      }
      params.delete('page') // Reset to first page on new search
      router.push(`/?${params.toString()}`)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="search"
          name="search"
          defaultValue={searchParams.get('search') || ''}
          placeholder="Search posts..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  )
}