import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export default function PostList({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600">No posts found</h3>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <Link href={`/posts/${post.id}`} className="block">
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-600">{post.title}</h2>
            </Link>
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <img
                src={post.author.image || '/default-avatar.png'}
                alt={post.author.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span>{post.author.name}</span>
              <span className="mx-2">•</span>
              <time>{formatDistanceToNow(new Date(post.createdAt))} ago</time>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <Link
                  key={tag.id}
                  href={`/?tag=${tag.name}`}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <span className="mr-4">💬 {post._count.comments} comments</span>
              <span>❤️ {post._count.likes} likes</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}