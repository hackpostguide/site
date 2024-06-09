'use client';
import { auth } from '@/lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { writeBatch, doc, getFirestore } from "firebase/firestore";
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { useEffect, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Complete({ postRef, completed }: { postRef: any, completed: boolean }) {
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

  const completeRef = doc(getFirestore(), postRef?.path, 'completes', uid);
  const [completeDoc] = useDocument(completeRef);

  const markComplete = async () => {
    const batch = writeBatch(getFirestore());
    batch.set(completeRef, { uid, completeStatus: 'Completed' });
    await batch.commit();
  };

  const markStarted = async () => {
    const batch = writeBatch(getFirestore());
    batch.set(completeRef, { uid, completeStatus: 'In Progress' });
    await batch.commit();
  };

  const markNotStarted = async () => {
    const batch = writeBatch(getFirestore());
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

  const [status, setStatus] = useState("Not Started");

  useEffect(() => {
    if (completeDoc?.exists()) {
      setStatus(completeDoc.data().completeStatus);
    } else {
      setStatus("Not Started");
    }
  }, [completeDoc]);

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === "Completed") {
      handleConfetti();
    } else if (newStatus === "In Progress") {
      markStarted();
    } else {
      markNotStarted();
    }
    setStatus(newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button ref={buttonRef} className="m-3 font-bold" size="lg" variant={status === 'Not Started' ? 'default' : 'outline'}>
          {status}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Set status</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={status} onValueChange={handleStatusChange}>
          <DropdownMenuRadioItem value="Not Started">Not Started</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="In Progress">In Progress</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Completed">Completed</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}