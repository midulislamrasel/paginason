import Link from 'next/link'

export default function Pagination({ pagination, searchParams }) {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination
  
  if (totalPages <= 1) return null

  const createPageUrl = (page) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page)
    return `/?${params.toString()}`
  }

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      {hasPrevPage && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Previous
        </Link>
      )}
      
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      
      {hasNextPage && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Next
        </Link>
      )}
    </div>
  )
}