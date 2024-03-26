'use client'
import { Button } from '@nextui-org/button'
import React from 'react'
import { toast } from 'react-hot-toast'

const ToastButton = () => {
  return (
    <div>
        {/* say hello world when click button */}
        <Button color="success"
            onClick={() => {
                console.log('Button was clicked');
                toast.success('hello toast!');
        }}>
        Toast Me
        </Button>
    </div>
  )
}

export default ToastButton