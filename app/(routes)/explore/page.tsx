

import { CreatePosts } from '@/components/routeComponents/home/CreatePosts';
import NewFeedExtendable from '@/components/routeComponents/explore/NewFeedExtendable';
import PopularFeedExtendable from '@/components/routeComponents/explore/PopularFeedExtendable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import { get } from 'lodash';
import { getMetadata } from '@/components/misc/Metatags';

export const metadata: Metadata = getMetadata({
  title: 'Explore Guides',
  description: 'All guides from the community',
});
 

const Explore = () => {
  return (
    <main>
      {/* <Metatags title="Explore All" description="All posts from the community" /> */}
      <section className='mb-4 text-center'>
        <h1>All Guides</h1>
        <p>
          A collection of all guides from the community. <br />
        </p>
      </section>
      <section className='my-10'>
        <CreatePosts />
      </section>
      {/* Put tags here, search bar, etc. */}
      <section>
        <Tabs defaultValue="top" className="">
          <TabsList className="grid w-full sm:w-[300px] grid-cols-2">
            <TabsTrigger value="top">Top</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
          </TabsList>
          <TabsContent value="top">
            <PopularFeedExtendable />
          </TabsContent>
          <TabsContent value="latest">
            <NewFeedExtendable />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export default Explore;