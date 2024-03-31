'use client';
import styles from '@/app/styles/Admin.module.css'
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
                        <Link passHref href={`/${post.username}/${post.slug}`}>
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
        <form onSubmit={handleSubmit(updatePost)}>
            {preview && (
                <div className="card">
                    <ReactMarkdown>{watch('content')}</ReactMarkdown>
                </div>
            )}

            <div className={preview ? styles.hidden : styles.controls}>
                <ImageUploader />

                <textarea
                    {...register("content", {
                        maxLength: { value: 20000, message: 'content is too long' },
                        minLength: { value: 10, message: 'content is too short' },
                        required: { value: true, message: 'content is required' },
                    })}
                ></textarea>

                {errors.content && typeof errors.content === 'string' && <p className="text-danger">{errors.content}</p>}

                <fieldset>
                    <input className={styles.checkbox} type="checkbox" {...register("published")} />
                    <label>Published</label>
                </fieldset>

                <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
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