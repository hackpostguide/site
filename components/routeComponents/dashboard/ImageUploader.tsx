import { useRef, useState } from 'react';
import { auth, storage, STATE_CHANGED } from '@/lib/firebase';
import Loader from '@/components/misc/Loader';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Icon } from '@iconify/react';

export default function ImageUploader(): JSX.Element {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    // Creates a Firebase Upload Task
    const uploadFile = async () => {
        if (fileInputRef.current) {
        const file = fileInputRef.current.files?.[0] as Blob;
        if (file.size > 500 * 1024 * 1024) {
            setError('File size must be less than 500 MB');
            return;
        }

        const extension = file?.type.split('/')[1];
        const uid: any = auth?.currentUser?.uid;
        const fileRef = ref(storage, `uploads/${uid}/${Date.now()}.${extension}`);
        setUploading(true);
        setError(null);

        // Starts the upload
        const task = uploadBytesResumable(fileRef, file);

        // Listen to updates to upload task
        task.on(STATE_CHANGED, (snapshot) => {
            const pct: any = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            setProgress(pct);
        }, (error) => {
            setError('Upload failed: ' + error.message);
            setUploading(false);
        });

        // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
        task
            .then(() => getDownloadURL(fileRef))
            .then((url: any) => {
            setDownloadURL(url);
            setUploading(false);
            })
            .catch((error) => {
                setError('Failed to get download URL: ' + error.message);
                setUploading(false);
            });
        }
    };

    const handleFileChange = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="box max-w-6xl">
        <TooltipProvider>
        <Loader show={uploading} />
        {uploading && <h3>{progress}%</h3>}
        {error && <div className="text-danger">{error}</div>}
        {!uploading && (
            <Tooltip>
            <TooltipTrigger asChild>
                <Button color="secondary" onClick={handleFileChange}>
                    <Icon icon="tabler:camera-plus" width="24" height="24" className='mr-2' />
                    Upload Image
                    <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/x-png,image/gif,image/jpeg"
                    style={{ display: 'none' }}
                    onChange={uploadFile}
                    />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                After you upload your image, you will be able to copy-paste markdown code to insert your image
            </TooltipContent>
            </Tooltip>
        )}
        {downloadURL && 
            <div className="rounded-md p-4 my-4 bg-neutral-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 max-w-6xl w-full">
                <p className='font-bold'>
                    Uploaded! Paste the following into the editor:
                </p>
                <code>{`![alt](${downloadURL})`}</code>
            </div>
            
        }
        </TooltipProvider>
        </div>
    );
}