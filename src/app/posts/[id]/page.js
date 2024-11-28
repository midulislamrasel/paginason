import { getPost } from '@/lib/posts'
import PostDetail from '@/components/PostDetail'
import CommentSection from '@/components/CommentSection'
import { notFound } from 'next/navigation'

export default async function PostPage({ params }) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PostDetail post={post} />
      <CommentSection postId={post.id} comments={post.comments} />
    </div>
  )
}