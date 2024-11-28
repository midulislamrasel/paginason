import Link from 'next/link'

export default function TagList({ tags, selectedTag }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href="/"
        className={`px-3 py-1 rounded-full text-sm ${
          !selectedTag
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All Posts
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/?tag=${tag.name}`}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTag === tag.name
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          #{tag.name} ({tag._count.posts})
        </Link>
      ))}
    </div>
  )
}