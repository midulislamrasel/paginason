import { formatDistanceToNow } from 'date-fns'
import LikeButton from './LikeButton'

export default function PostDetail({ post }) {
  return (
    <article className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex items-center text-gray-500 text-sm mb-8">
        <img
          src={post.author.image || '/default-avatar.png'}
          alt={post.author.name}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>{post.author.name}</span>
        <span className="mx-2">•</span>
        <time>{formatDistanceToNow(new Date(post.createdAt))} ago</time>
      </div>

      <div className="prose max-w-none mb-8">
        {post.content}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center space-x-4">
          <LikeButton postId={post.id} likes={post.likes} />
          <span className="text-gray-500">
            💬 {post.comments.length} comments
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}