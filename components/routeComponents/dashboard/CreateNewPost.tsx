import React from 'react'
import AuthCheck from '@/components/routeComponents/dashboard/AuthCheck'
import PostCard from '@/components/postComponents/PostCard'
import { UserContext } from '@/lib/context'
import { auth } from '@/lib/firebase'
import { serverTimestamp, query, collection, orderBy, getFirestore, setDoc, doc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import kebabCase from 'lodash.kebabcase'
import toast from 'react-hot-toast'
import { title, subtitle } from "@/components/misc/Primitives";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export const CreateNewPost = (): JSX.Element => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
    //slug generation: 
    // Get the current timestamp in milliseconds
    const currentTimestamp = Date.now();
    // Convert milliseconds to seconds
    const secondsSinceEpoch = Math.floor(currentTimestamp / 1000);
    // Subtract the number of seconds between 1/1/1970 and 1/1/2000
    const secondsSince2000 = secondsSinceEpoch - 946684800;
    // Use the number of seconds since 1/1/2000 as the slug
    // Ensure slug is URL safe
    const kebabTitle = encodeURI(kebabCase(title))
    const slug = "post-" + secondsSince2000.toString() + "-" + kebabTitle;
  
  
    // Validate length
    const isValid = title.length > 3 && title.length < 100;
  
     // Create a new post in firestore
     const createPost = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      const uid = auth?.currentUser?.uid;
      if (!uid) return;

      const ref = doc(getFirestore(), 'users', uid, 'posts', slug);
      const data = {
        title,
        slug,
        uid,
        username,
        published: false,
        description,
        content: "# hello world! \nPosts use markdown - if you are unfamiliar with markdown, check out [this guide](https://guides.github.com/features/mastering-markdown/). You can click on the link after previewing your post (using the preview button). After publishing, you may view your post's public page using the 'Live Post' button. \n\nHappy writing! 🚀" ,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        heartCount: 0,
        views: 0,
        tags: [],
      };
      
      toast.promise(setDoc(ref, data), {
        loading: 'Creating post...',
        success: 'Post created!',
        error: 'Failed to create post',
      });

      router.push(`/dashboard/${slug}`);
    };
  
    return (
      <form onSubmit={createPost}>
        <div className="flex flex-col gap-5">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your title here..."
            className="flex-grow mr-2 h-16"
          />
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              placeholder="Insert a description here." 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit" color="success" disabled={!isValid} size="lg" className="h-16">
            Create New
          </Button>
        </div>
      </form>
    );
}
