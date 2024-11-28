import PostList from '@/components/PostList'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import TagList from '@/components/TagList'
import { getPosts, getAllTags } from '@/lib/posts'

export default async function Home({ searchParams }) {
  const page = Number(searchParams.page) || 1
  const tag = searchParams.tag || null
  const search = searchParams.search || ''

  const [{ posts, pagination }, tags] = await Promise.all([
    getPosts({ page, tag, search }),
    getAllTags()
  ])

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Latest Posts</h1>
      <SearchBar />
      <TagList tags={tags} selectedTag={tag} />
      <PostList posts={posts} />
      <Pagination pagination={pagination} searchParams={searchParams} />
    </div>
  )
}