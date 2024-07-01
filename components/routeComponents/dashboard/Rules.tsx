import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
  

export const Rules = () => {
  return (
    <div>
        <Accordion type="single" collapsible className='w-full'>
            <AccordionItem value="item-1">
                <AccordionTrigger>Rules</AccordionTrigger>
                <AccordionContent>
                    <p>
                        <ol className='mb-4'>
                            <li>1. No NSFW</li>
                            <li>2. No spam</li>
                            <li>3. Must be related to hackathons, app development, or hacking</li>
                            <li>4. No explicit, inappropriate, or illegal content</li>
                            <li>5. No low-quality posts</li>
                            <li>6. Follow Hackpost Guide&apos;s community guidelines and terms of service. </li>
                        </ol>
                        Hackpost Guide moderators can unpublish/delete posts deemed in violation of these rules. If you have any questions, reach out to <b>team@hackpost.guide</b>. 
                    </p> 
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  )
}
