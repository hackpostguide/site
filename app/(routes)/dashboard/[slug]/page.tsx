'use client';
import AuthCheck from "@/components/routeComponents/dashboard/AuthCheck";
import { auth } from "@/lib/firebase";
import { doc, getFirestore, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname, useSelectedLayoutSegments } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import ImageUploader from '@/components/routeComponents/dashboard/ImageUploader';
import { MarkdownComponents } from '@/components/postComponents/MarkdownComponents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { tags } from "@/app/config/tags";

import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { TagManager } from "@/components/routeComponents/dashboard/TagManager";


export default function AdminPostEdit() {
    return (
        <AuthCheck>
            <PostManager />
        </AuthCheck>
    );
}

function PostManager() {

    const [preview, setPreview] = useState(false);
    const [published, setPublished] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const pathname = usePathname();
    const slugSegment = pathname.split('/').pop(); // Extract the last segment from the pathname
    const slug = slugSegment ? slugSegment : ''; // Convert to string and handle undefined case

    // DEBUGGING
    // console.log('segments', segments)
    // console.log('useSearchParams', usePathname());
    // console.log('slug', slug);

    const uid: any = auth?.currentUser?.uid;
    const postRef = doc(getFirestore(), 'users', uid, 'posts', slug);
    const [post] = useDocumentDataOnce(postRef);

    // Update the published state whenever the post data changes
    useEffect(() => {
      if (post) {
        setPublished(post.published);
      }
    }, [post]);

    return (
        <main className="flex flex-col md:flex-row gap-4 p-4">
          {post && (
            <>
              <section className="flex-1">
                {isDirty && (
                  <div className="mb-4">
                    <Card className="bg-danger/60">
                      <CardContent>
                        <p>You have changes to be saved!</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <Card className='p-5 my-5'>
                  <CardHeader className="flex text-center">
                    <CardTitle className='text-center mb-6'>
                      <h2>{post?.title}</h2>
                    </CardTitle>
                    <CardDescription className="text-warning">
                      <p>Preview/Editing Mode</p>
                    </CardDescription>
                  </CardHeader>
                </Card>
                {/* <p className="mb-4">ID: {post.slug}</p> */}
                <PostForm postRef={postRef} defaultValues={post} preview={preview} setPublished={setPublished} setIsDirty={setIsDirty} />
              </section>
              <aside className="flex flex-col bg-default px-8 py-4 rounded-md items-start">
                <Button 
                  onClick={() => setPreview(!preview)}
                  color="primary"
                  className="mb-4"
                >
                  {preview ? 'Edit' : 'Preview'}
                </Button>
                <Button 
                    color="primary"
                    className="mb-4"
                    disabled={!published}
                    asChild
                >
                  <Link href={`/users/${post.username}/${post.slug}`}>
                    Live View
                  </Link>
                </Button>
                
                <TagManager postRef={postRef} />

                <DeletePostButton postRef={postRef} />
              </aside>
            </>
          )}
        </main>
      );
}

function PostForm({ defaultValues, postRef, preview, setPublished, setIsDirty }: { defaultValues: any, postRef: any, preview: boolean, setPublished: any, setIsDirty: any}) {
    const { control, register, formState: { errors }, handleSubmit, formState, reset, watch } = useForm({ defaultValues, mode: 'onChange' });


    const { isValid, isDirty } = formState;

    const updatePost = async ({ content, published }: { content: string, published: boolean }) => {
        await updateDoc(postRef, {
            content,
            published,
            updatedAt: serverTimestamp(),
        });

        reset({ content, published });
        setPublished(published);
        setIsDirty(false);

        if (published) {
          toast.success('Post published successfully!');
      } else {
          toast.success('Post updated successfully!');
      }
    };

    // Update the isDirty state whenever the form state changes
    useEffect(() => {
      setIsDirty(isDirty);
    }, [isDirty, setIsDirty]);

    return (
        <form onSubmit={handleSubmit(updatePost)} className="flex flex-col gap-4">
          {preview && (
            <div className="max-w-3xl mx-auto">
              <ReactMarkdown components={MarkdownComponents}>{watch('content')}</ReactMarkdown>
            </div>
          )}
    
          <div className={`${preview ? 'hidden' : 'flex flex-col gap-4'}`}>
            <ImageUploader />
    
            <textarea
              {...register("content", {
                maxLength: { value: 20000, message: 'content is too long' },
                minLength: { value: 10, message: 'content is too short' },
                required: { value: true, message: 'content is required' },
              })}
              className="textArea h-60 bg-default text-foreground p-4 rounded-md resize-y"
            ></textarea>
    
            {errors.content && typeof errors.content === 'string' && <p className="text-danger">{errors.content}</p>}
    
            <div className="flex items-center">
                <input type="checkbox" {...register("published")} />
                <label className="ml-2">Published</label>
            </div>
    
            <Button
              type="submit"
              className="w-full"
              disabled={!isDirty || !isValid}
            >
              {isDirty ? 'Save Changes' : 'Saved!'}
            </Button>
          </div>
        </form>
    );
}

function DeletePostButton({ postRef }: { postRef: any }) {
    const router = useRouter();

    const deletePost = async () => {
        const doIt = confirm('are you sure!');
        if (doIt) {
            await deleteDoc(postRef);
            router.push('/dashboard');
            toast('post annihilated ', { icon: '🗑️' });
        }
    };

    return (
        <Button 
            className="text-danger hover:text-danger"
            onClick={deletePost}
            variant="outline"
        >
            Delete
        </Button>
    );
}