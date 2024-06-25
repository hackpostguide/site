import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { NextResponse } from 'next/server'
import { firestore } from '@/lib/firebase'
import { collection, getDocs, query, where, collectionGroup, getDoc } from 'firebase/firestore'

export async function GET() {
  const stream = new SitemapStream({ hostname: 'https://www.hackpost.guide' })

  try {
    console.log('Starting sitemap generation...')

    // Query all 'posts' subcollections across all user documents
    const postsQuery = query(
      collectionGroup(firestore, 'posts'),
      where('published', '==', true)
    )

    console.log('Executing Firestore query...')
    const postsSnapshot = await getDocs(postsQuery)
    console.log(`Found ${postsSnapshot.size} published posts`)

    // Add each published guide to the sitemap
    for (const doc of postsSnapshot.docs) {
      const data = doc.data()
      const userDocRef = doc.ref.parent.parent
      
      if (userDocRef && data.slug) {
        // Get the user document to fetch the username
        const userDoc = await getDoc(userDocRef)
        const username = userDoc.data()?.username

        if (username) {
          console.log(`Adding guide: /users/${username}/${data.slug}`)
          stream.write({
            url: `/users/${username}/${data.slug}`,
            changefreq: 'weekly',
            priority: 0.8,
          })
        } else {
          console.log(`Skipping guide due to missing username: ${doc.id}`)
        }
      } else {
        console.log(`Skipping guide due to missing userDocRef or slug: ${doc.id}`)
      }
    }

    console.log('Closing stream...')
    // Close the stream
    stream.end()

    console.log('Generating sitemap...')
    // Generate sitemap
    const sitemap = await streamToPromise(Readable.from(stream)).then((sm) => sm.toString())

    console.log('Sitemap generated successfully')
    // Return the sitemap
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error: any) {
    console.error('Error generating sitemap:', error)
    return new NextResponse(`Error generating sitemap: ${error.message}`, { status: 500 })
  }
}