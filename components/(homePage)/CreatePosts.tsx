import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React from 'react'

export const CreatePosts = () => {
    return (
        <div className='text-center'>
            <h2>Want to write guides?</h2>
            <p>It&apos;s free! Create an account today to start posting!</p> 
            <Button color="warning" size='lg' className='text-sm font-bold my-8' asChild>
                <Link href="/dashboard">
                    Start posting now
                </Link>
            </Button>
        </div>
    )
}
