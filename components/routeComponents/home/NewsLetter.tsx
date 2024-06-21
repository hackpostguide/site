'use client';
import React from 'react'
import { MailIcon } from '../../misc/Icons'
// import { Input } from '@nextui-org/react'

export default function NewsLetter(){
  const [value, setValue] = React.useState("");


  return (
    <div>
      <p>Newsletter</p>
      {/* <Input
        type="email"
        label="Email"
        // placeholder="you@example.com"
        className="max-w-xl"
        value={value}
        onValueChange={setValue}
        // startContent={
        //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        // }
        errorMessage="Please enter a valid email"
      /> */}
    </div>
  )
}
