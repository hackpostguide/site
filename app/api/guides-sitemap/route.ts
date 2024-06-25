import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { NextResponse } from 'next/server'
import { firestore } from '@/lib/firebase'
import { collection, getDocs, query, where, collectionGroup } from 'firebase/firestore'

export async function GET() {
  const stream = new SitemapStream({ hostname: 'https://www.hackpost.guide' })

  try {
    // Query all 'posts' subcollections across all user documents
    const postsQuery = query(
      collectionGroup(firestore, 'posts'),
      where('published', '==', true)
    )

    const postsSnapshot = await getDocs(postsQuery)

    // Add each published guide to the sitemap
    postsSnapshot.forEach((doc) => {
      const data = doc.data()
      const userId = doc.ref.parent.parent?.id // This gets the UID of the user
      
      if (userId && data.slug) {
        stream.write({
          url: `/users/${userId}/${data.slug}`,
          changefreq: 'weekly',
          priority: 0.8,
        })
      }
    })

    // Close the stream
    stream.end()

    // Generate sitemap
    const sitemap = await streamToPromise(Readable.from(stream)).then((sm) => sm.toString())

    // Return the sitemap
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}