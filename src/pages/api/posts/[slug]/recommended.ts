import type { NextApiRequest, NextApiResponse } from 'next'
import { getRecommendedPosts } from '@/lib/api'
import { Post } from '@/interfaces/post'
import { wait } from '@/lib/wait'

interface ResponseData {
  posts: Post[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }

  const slug = req.query.slug as string
  const recommendedPosts = await getRecommendedPosts(slug)

  console.log(
    'Retrieved recommended posts (API)',
    recommendedPosts.map((p) => p.slug),
  )

  await wait(Math.random() * 5000)

  res.status(200).json({ posts: recommendedPosts })
}
