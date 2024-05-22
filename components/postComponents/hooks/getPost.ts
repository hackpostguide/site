import { getUserWithUsername, postToJSON } from "@/lib/firebase";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";

export async function getPost(username: string, slug: string) {
    const userDoc = await getUserWithUsername(username);
    let post;
    let path;
    if (userDoc) {
      const postRef = doc(getFirestore(), userDoc.ref.path, 'posts', slug);
      post = postToJSON(await getDoc(postRef));
      path = postRef.path;
    }
    else{
      notFound();
    }
    return { props: { post, path }, revalidate: 100 };
}