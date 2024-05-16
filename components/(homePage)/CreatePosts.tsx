import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

export const CreatePosts = () => {
    return (
        <div className=''>
            <Card>
                <CardContent className='mt-10 flex justify-center gap-10'>
                    <div>
                        <h2>Want to write guides?</h2>
                        <p>It&apos;s free - Create an account today to start posting!</p> 
                    </div>
                    <Button color="warning" size='lg' className='text-sm font-bold my-8' asChild>
                        <Link href="/enter">
                            Create an Account
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            
        </div>
    )
}
