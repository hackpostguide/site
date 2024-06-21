'use client';
import { auth } from '@/lib/firebase';
// import { useDocument } from '@/app/lib/hooks';
import { useDocument } from 'react-firebase-hooks/firestore';
import { increment, writeBatch, doc, getFirestore } from "firebase/firestore";
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { HeartFilledIcon } from '@/components/misc/Icons';

// Allows user to heart or like a post
export default function Heart({ postRef, heartCount }: {postRef: any, heartCount: number}) {

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
    const heartRef = doc(getFirestore(), postRef?.path, 'hearts', uid);
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
          className="my-3 font-bold"
          size="lg"
          variant={'outline'}
          onClick={removeHeart}
        >
          {/* <Icon icon="foundation:arrow-up" /> */}
          💖 {heartCount} Hearted!
        </Button>
      ) : (
        <Button
          ref={buttonRef}
          className="my-3 font-bold"
          size="lg"
          variant={'default'}
          onClick={handleConfetti}
        >
          💖 {heartCount} Hearts
        </Button>
      );
    }