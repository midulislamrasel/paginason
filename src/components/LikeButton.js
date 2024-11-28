'use client'

import { useSession } from 'next-auth/react'
import { useTransition } from 'react'
import { toggleLike } from '@/app/actions/posts'
import toast from 'react-hot-toast'

export default function LikeButton({ postId, likes }) {
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition()
  
  const isLiked = session?.user?.id && likes.some(like => like.userId === session.user.id)

  const handleLike = () => {
    if (!session) {
      toast.error('You must be logged in to like posts')
      return
    }

    startTransition(async () => {
      const result = await toggleLike(postId)
      if (result.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`flex items-center space-x-1 ${
        isLiked ? 'text-red-600' : 'text-gray-500'
      } hover:text-red-600 disabled:opacity-50`}
    >
      <span>{isLiked ? '❤️' : '🤍'}</span>
      <span>{likes.length}</span>
    </button>
  )
}