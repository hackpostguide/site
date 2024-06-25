import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { NextResponse } from 'next/server'
import { firestore } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export async function GET() {
  const stream = new SitemapStream({ hostname: 'https://www.hackpost.guide' })

  // Fetch all published guides from Firestore
  const guidesQuery = query(collection(firestore, 'users'), where('published', '==', true))
  const guidesSnapshot = await getDocs(guidesQuery)

  // Add each guide to the sitemap
  guidesSnapshot.forEach((doc) => {
    const data = doc.data()
    stream.write({
      url: `/users/${data.username}/${data.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
    })
  })

  // End the stream
  stream.end()

  // Generate sitemap
  const sitemap = await streamToPromise(Readable.from(stream)).then((sm) => sm.toString())

  // Return the sitemap
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}