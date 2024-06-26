'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

import { doc, getFirestore, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { auth } from '@/lib/firebase';

import AuthCheck from '@/components/routeComponents/dashboard/AuthCheck';
import ImageUploader from '@/components/routeComponents/dashboard/ImageUploader';
import { MarkdownComponents } from '@/components/postComponents/MarkdownComponents';
import { TagManager } from '@/components/routeComponents/dashboard/TagManager';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PostData {
  title: string;
  slug: string;
  username: string;
  content: string;
  published: boolean;
  description: string;
}

export default function AdminPostEdit(): JSX.Element {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager(): JSX.Element {
  const [preview, setPreview] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const pathname = usePathname();
  const slugSegment = pathname?.split('/').pop();
  const slug = slugSegment ? slugSegment : '';

  const uid = auth.currentUser?.uid;
  const postRef = doc(getFirestore(), 'users', uid as string, 'posts', slug);
  const [post] = useDocumentDataOnce(postRef);

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
                  <h2>{post.title}</h2>
                  <p>Preview/Editing Mode</p>
                </CardTitle>
              </CardHeader>
            </Card>
            <PostForm 
              postRef={postRef} 
              defaultValues={post as PostData} 
              preview={preview} 
              setIsDirty={setIsDirty}
            />
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
              disabled={!post.published}
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

interface PostFormProps {
  defaultValues: PostData;
  postRef: any;
  preview: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

function PostForm({ defaultValues, postRef, preview, setIsDirty }: PostFormProps): JSX.Element {
  const { register, handleSubmit, watch, formState: { isDirty, isValid }, getValues } = useForm<PostData>({ 
    defaultValues, 
    mode: 'onChange' 
  });

  const [localIsDirty, setLocalIsDirty] = useState(false);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'description' || name === 'content' || name === 'published') {
        const formValues = getValues();
        const isContentDirty = formValues.content !== defaultValues.content;
        const isDescriptionDirty = formValues.description !== defaultValues.description;
        const isPublishedDirty = formValues.published !== defaultValues.published;
        const newIsDirty = isContentDirty || isDescriptionDirty || isPublishedDirty;
        setLocalIsDirty(newIsDirty);
        setIsDirty(newIsDirty);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues, setIsDirty, defaultValues]);

  const updatePost = async ({ content, published, description }: PostData) => {
    await updateDoc(postRef, {
      content,
      published,
      description: description || '',
      updatedAt: serverTimestamp(),
    });

    setLocalIsDirty(false);
    setIsDirty(false);
    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)} className="flex flex-col gap-4">
      {preview ? (
        <div className="max-w-3xl mx-auto">
          <ReactMarkdown components={MarkdownComponents}>{watch('content')}</ReactMarkdown>
        </div>
      ) : (
        <>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Description (max 300 characters)</Label>
            <Textarea 
              {...register("description", {
                maxLength: { value: 300, message: 'Description cannot exceed 300 characters' },
              })}
              placeholder="Enter post description (optional)" 
              id="description"
              className="h-20"
            />
            {watch('description')?.length === 300 && <p className="text-warning">Maximum length reached</p>}
            <p className="text-sm text-gray-500">{watch('description')?.length || 0}/300</p>
          </div>

          <ImageUploader />

          <textarea
            {...register("content", {
              maxLength: { value: 20000, message: 'content is too long' },
              minLength: { value: 10, message: 'content is too short' },
              required: { value: true, message: 'content is required' },
            })}
            className="textArea h-60 bg-default text-foreground p-4 rounded-md resize-y"
          ></textarea>

          <div className="flex items-center">
            <input type="checkbox" {...register("published")} />
            <label className="ml-2">Published</label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!localIsDirty || !isValid}
          >
            {localIsDirty ? 'Save Changes' : 'No Changes'}
          </Button>
        </>
      )}
    </form>
  );
}
interface DeletePostButtonProps {
  postRef: any;
}

function DeletePostButton({ postRef }: DeletePostButtonProps): JSX.Element {
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