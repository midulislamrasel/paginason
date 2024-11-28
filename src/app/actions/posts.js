'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export async function createPost(formData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('You must be logged in to create a post')
  }

  const title = formData.get('title')
  const content = formData.get('content')
  const tags = formData.get('tags')?.split(',').map(tag => tag.trim()) || []

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        published: true,
        author: {
          connect: { id: session.user.id }
        },
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      }
    })

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to create post' }
  }
}

export async function toggleLike(postId) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('You must be logged in to like a post')
  }

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId
        }
      }
    })

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id }
      })
    } else {
      await prisma.like.create({
        data: {
          user: { connect: { id: session.user.id } },
          post: { connect: { id: postId } }
        }
      })
    }

    revalidatePath(`/posts/${postId}`)
    return { success: true }
  } catch (error) {
    return { error: 'Failed to toggle like' }
  }
}