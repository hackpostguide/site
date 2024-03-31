'use client';
import AuthCheck from "@/app/components/(dashboard)/AuthCheck";
import { auth } from "@/app/lib/firebase";
import { doc, getFirestore, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname, useSelectedLayoutSegments } from "next/navigation";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import ImageUploader from '@/app/components/(dashboard)/ImageUploader';
import { MarkdownComponents } from '@/app/components/(postComponents)/MarkdownComponents';

export default function AdminPostEdit() {
    return (
        <AuthCheck>
            <PostManager />
        </AuthCheck>
    );
}

function PostManager() {

    const [preview, setPreview] = useState(false);

    // const segments = useSelectedLayoutSegments();
    // const slug = segments[segments.length - 1]; // The last segment is the [slug] parameter

    const router = useRouter();
    // const { slug } = router.query as { slug: string };
    // const { slug } = usePathname() as unknown as { slug: string };
    const pathname = usePathname();
    const slugSegment = pathname.split('/').pop(); // Extract the last segment from the pathname
    const slug = slugSegment ? slugSegment : ''; // Convert to string and handle undefined case

    // console.log('segments', segments)
    console.log('useSearchParams', usePathname());
    console.log('slug', slug);

    const uid: any = auth?.currentUser?.uid;

    // const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
    const postRef = doc(getFirestore(), 'users', uid, 'posts', slug);
    const [post] = useDocumentDataOnce(postRef);

    return (
        <main className={styles.container}>
            {post && (
                <>
                    <section>
                        <h1>{post.title}</h1>
                        <p>ID: {post.slug}</p>

                        <PostForm postRef={postRef} defaultValues={post} preview={preview} />
                    </section>

                    <aside>
                        <h3>Tools</h3>
                        <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
                        <Link passHref href={`/users/${post.username}/${post.slug}`}>
                            <button className="btn-blue">Live view</button>
                        </Link>
                        <DeletePostButton postRef={postRef} />
                    </aside>
                </>
            )}
        </main>
    );
}

function PostForm({ defaultValues, postRef, preview }: { defaultValues: any, postRef: any, preview: boolean }) {
    const { register, formState: { errors }, handleSubmit, formState, reset, watch } = useForm({ defaultValues, mode: 'onChange' });

    const { isValid, isDirty } = formState;

    const updatePost = async ({ content, published }: { content: string, published: boolean }) => {
        await updateDoc(postRef, {
            content,
            published,
            updatedAt: serverTimestamp(),
        });

        reset({ content, published });

        toast.success('Post updated successfully!');
    };

    return (
        <form onSubmit={handleSubmit(updatePost)} className="flex flex-col gap-4">
          {preview && (
            <div className="card">
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
              className="textArea h-60 bg-default text-white p-4 rounded-md resize focus:outline-none"
            ></textarea>
    
            {errors.content && typeof errors.content === 'string' && <p className="text-red-500">{errors.content}</p>}
    
            <div className="flex items-center">
              <input
                className="mr-2 h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                type="checkbox"
                {...register("published")}
              />
              <label>Published</label>
            </div>
    
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isDirty || !isValid}
            >
              Save Changes
            </button>
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
        <button className="btn-red" onClick={deletePost}>
            Delete
        </button>
    );
}