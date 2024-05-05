import { siteConfig } from '@/app/config/site'
import { Button, Link } from '@nextui-org/react'
import React from 'react'

export const CreatePosts = () => {
    return (
        <div className='text-center'>
            <h2>Want to write guides?</h2>
            <p>It&apos;s free! Create an account today to start posting!</p> 
            <Button isExternal color="warning" size='lg' as={Link} className='text-sm font-bold my-8' variant='ghost' href={siteConfig.links.discord}>
                Start posting now
            </Button>
        </div>
    )
}
