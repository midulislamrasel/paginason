'use client'

import { useSession } from 'next-auth/react'
import { useTransition } from 'react'
import { useSocket } from '@/hooks/useSocket'
import { addComment } from '@/app/actions/comments'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'

export default function CommentSection({ postId, comments: initialComments }) {
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition()
  const socket = useSocket()
  const [comments, setComments] = useState(initialComments)

  useEffect(() => {
    if (socket) {
      socket.on('newComment', (comment) => {
        if (comment.postId === postId) {
          setComments((prev) => [comment, ...prev])
        }
      })
    }
    return () => {
      if (socket) {
        socket.off('newComment')
      }
    }
  }, [socket, postId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!session) {
      toast.error('You must be logged in to comment')
      return
    }

    const formData = new FormData(e.target)
    startTransition(async () => {
      const result = await addComment(formData)
      if (result.error) {
        toast.error(result.error)
      } else {
        e.target.reset()
        toast.success('Comment added successfully')
      }
    })
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Comments</h2>

      {session && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="postId" value={postId} />
          <textarea
            name="content"
            rows="3"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Add a comment..."
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-2 mb-2">
              <img
                src={comment.author.image || '/default-avatar.png'}
                alt={comment.author.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="font-medium">{comment.author.name}</span>
              <span className="text-gray-500 text-sm">
                {formatDistanceToNow(new Date(comment.createdAt))} ago
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}