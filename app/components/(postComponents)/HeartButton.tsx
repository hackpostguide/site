import { auth } from '@/app/lib/firebase';
// import { useDocument } from '@/app/lib/hooks';
import { useDocument } from 'react-firebase-hooks/firestore';
import { increment, writeBatch, doc, getFirestore } from "firebase/firestore";
import { Button } from '@nextui-org/react';


// Allows user to heart or like a post
export default function Heart({ postRef }: any) {

    // console.log('postRef from HeartButton:', postRef);

    const uid: any = auth?.currentUser?.uid;

    // Listen to heart document for currently logged in user
    // const heartRef = doc(getFirestore(), postRef.path, 'hearts', uid);
    const heartRef = doc(getFirestore(), postRef.path, 'hearts', uid);
    const [heartDoc] = useDocument(heartRef);

    // Create a user-to-post relationship
    const addHeart = async () => {
        const batch = writeBatch(getFirestore());

        batch.update(postRef, { heartCount: increment(1) });
        batch.set(heartRef, { uid });

        await batch.commit();
    };

    // Remove a user-to-post relationship
    const removeHeart = async () => {
        const batch = writeBatch(getFirestore());

        batch.update(postRef, { heartCount: increment(-1) });
        batch.delete(heartRef);

        await batch.commit();
    };

    return heartDoc?.exists() ? (
        <Button className="m-3" color="secondary" variant="bordered" onClick={removeHeart}>💔 Unheart</Button>
    ) : (
        <Button className="m-3" color="secondary" variant="bordered" onClick={addHeart}>💖 Heart</Button>
    );
}