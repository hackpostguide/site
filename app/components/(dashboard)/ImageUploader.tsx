import { useState } from 'react';
import { auth, storage, STATE_CHANGED } from '@/app/lib/firebase';
import Loader from '@/app/components/Loader';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';

// Uploads images to Firebase Storage
export default function ImageUploader(): JSX.Element {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);
    const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);

    // Creates a Firebase Upload Task
    const uploadFile = async () => {
        if (fileInputRef) {
        const file = fileInputRef.files?.[0] as Blob;
        const extension = file?.type.split('/')[1];
        const uid: any = auth?.currentUser?.uid;
        const fileRef = ref(storage, `uploads/${uid}/${Date.now()}.${extension}`);
        setUploading(true);

        // Starts the upload
        const task = uploadBytesResumable(fileRef, file);

        // Listen to updates to upload task
        task.on(STATE_CHANGED, (snapshot) => {
            const pct: any = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            setProgress(pct);
        });

        // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
        task
            .then(() => getDownloadURL(fileRef))
            .then((url: any) => {
            setDownloadURL(url);
            setUploading(false);
            });
        }
    };

    return (
        <div className="box">
        <Loader show={uploading} />
        {uploading && <h3>{progress}%</h3>}
        {!uploading && (
            <Button 
                color="success" 
                endContent={<Icon icon="bi:image" width="1.2em" height="1.2em" />}
                onClick={() => fileInputRef?.click()}
            >
            Upload Img
            <input
                type="file"
                ref={setFileInputRef}
                accept="image/x-png,image/gif,image/jpeg, image/jpg"
                style={{ display: 'none' }}
            />
            </Button>
        )}
        {downloadURL && <code className="upload-snippet">{`![alt](${downloadURL})`}</code>}
        </div>
    );
}