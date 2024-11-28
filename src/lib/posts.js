import prisma from './prisma'

const POSTS_PER_PAGE = 9

export async function getPosts({ page = 1, tag = null, search = '' } = {}) {
  try {
    const where = {
      published: true,
      ...(tag && {
        tags: {
          some: {
            name: tag
          }
        }
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } }
        ]
      })
    }

    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
          tags: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * POSTS_PER_PAGE,
        take: POSTS_PER_PAGE,
      }),
      prisma.post.count({ where })
    ])

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    return {
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      posts: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalPosts: 0,
        hasNextPage: false,
        hasPrevPage: false
      }
    }
  }
}

export async function getPost(id) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: true,
        tags: true,
      },
    })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getAllTags() {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: {
        posts: {
          _count: 'desc'
        }
      }
    })
    return tags
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}