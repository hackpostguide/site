'use client';
import { auth } from '@/lib/firebase';
// import { useDocument } from '@/app/lib/hooks';
import { useDocument } from 'react-firebase-hooks/firestore';
import { increment, writeBatch, doc, getFirestore } from "firebase/firestore";
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from 'react';

// Allows user to heart or like a post
export default function Heart({ postRef }: any) {

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };
    
        window.addEventListener('resize', handleResize);
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);

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

    const handleConfetti = () => {
        const buttonRect = buttonRef.current?.getBoundingClientRect();
        if (buttonRect) {
          const origin = {
            x: (buttonRect.left + buttonRect.width / 2) / windowSize.width,
            y: (buttonRect.top + buttonRect.height / 2) / windowSize.height,
          };
          confetti({ particleCount: 100, spread: 70, origin });
        }
        addHeart();
      };
    
      return heartDoc?.exists() ? (
        <Button
          className="m-3"
          size="lg"
          onClick={removeHeart}
        >
          💔 Unheart
        </Button>
      ) : (
        <Button
          ref={buttonRef}
          className="m-3"
          size="lg"
          onClick={handleConfetti}
        >
          💖 Heart
        </Button>
      );
    }