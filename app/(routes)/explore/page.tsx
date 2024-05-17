
import Metatags from '@/components/Metatags';
import { CreatePosts } from '@/components/(homePage)/CreatePosts';
import NewFeedExtendable from '@/components/(explorePage)/NewFeedExtendable';
import PopularFeedExtendable from '@/components/(explorePage)/PopularFeedExtendable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator';

const Explore = () => {
  return (
    <main>
      <Metatags title="Explore All" description="All posts from the community" />
      <section className='my-9 text-center'>
        <h1>Explore</h1>
      </section>
      <section className='my-16'>
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