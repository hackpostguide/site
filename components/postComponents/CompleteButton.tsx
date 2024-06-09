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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Circle, CircleDashed, CheckCircle } from 'lucide-react';

export default function Complete({ postRef, completed, isIcon }: { postRef: any, completed: boolean, isIcon: boolean }) {
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

  const markInProgress = async () => {
    const batch = writeBatch(getFirestore());
    batch.set(completeRef, { uid, completeStatus: 'In Progress' });
    await batch.commit();
  };

  const markNotStarted = async () => {
    const batch = writeBatch(getFirestore());
    batch.set(completeRef, { uid, completeStatus: 'Not Started' });
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
      markInProgress();
    } else {
      markNotStarted();
    }
    setStatus(newStatus);
  };

  const getButtonClasses = () => {
    switch (status) {
      case "Completed":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "In Progress":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case "Not Started":
      default:
        return "bg-red-500 hover:bg-red-600 text-white";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "Completed":
        return <CheckCircle className='mx-2' />;
      case "In Progress":
        return <CircleDashed className='mx-2' />;
      case "Not Started":
      default:
        return <Circle className='mx-2' />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button ref={buttonRef} className={`m-3 font-bold ${getButtonClasses()}`} size={isIcon ? "icon" : "lg"}>
          {isIcon ? getIcon() : <>{getIcon()} {status}</>}
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
