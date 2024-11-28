'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export async function addComment(formData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('You must be logged in to comment')
  }

  const postId = formData.get('postId')
  const content = formData.get('content')

  try {
    await prisma.comment.create({
      data: {
        content,
        author: {
          connect: { id: session.user.id }
        },
        post: {
          connect: { id: postId }
        }
      }
    })

    revalidatePath(`/posts/${postId}`)
    return { success: true }
  } catch (error) {
    return { error: 'Failed to add comment' }
  }
}