'use client';
import { auth } from '@/lib/firebase';
// import { useDocument } from '@/app/lib/hooks';
import { useDocument } from 'react-firebase-hooks/firestore';
import { increment, writeBatch, doc, getFirestore } from "firebase/firestore";
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { HeartFilledIcon } from '@/components/Icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Allows user to heart or like a post
export default function Complete({ postRef, completed }: {postRef: any, completed: boolean}) {

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
    const completeRef = doc(getFirestore(), postRef?.path, 'completes', uid);
    const [completeDoc] = useDocument(completeRef);

    // Create a user-to-post relationship
    const markComplete = async () => {
        const batch = writeBatch(getFirestore());

        // batch.update(postRef, { heartCount: increment(1) });
        batch.set(completeRef, { uid, "completeStatus": "complete" });

        await batch.commit();
    };

    // Create a user-to-post relationship
    const markStarted = async () => {
      const batch = writeBatch(getFirestore());

      // batch.update(postRef, { heartCount: increment(1) });
      batch.set(completeRef, { uid, "completeStatus": "started" });

      await batch.commit();
  };

    // Remove a user-to-post relationship
    const markNotStarted = async () => {
        const batch = writeBatch(getFirestore());

        // batch.update(postRef, { heartCount: increment(-1) });
        batch.delete(completeRef);

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
        markComplete();
      };

      const [status, setStatus] = useState("bottom")
      
    
      return completeDoc?.exists() ? (
        <Button
          className="m-3 font-bold"
          size="lg"
          variant={'outline'}
          onClick={markNotStarted}
        >
          {/* <Icon icon="foundation:arrow-up" /> */}
          Completed!
        </Button>
      ) : (
        <Button
          ref={buttonRef}
          className="m-3 font-bold"
          size="lg"
          variant={'default'}
          onClick={handleConfetti}
        >
          Not Completed
        </Button>
      );
    }