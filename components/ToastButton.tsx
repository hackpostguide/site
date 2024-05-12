'use client'
import { Button } from '@nextui-org/button'
import React from 'react'
import { toast } from 'react-hot-toast'

const ToastButton = ({ text = "Hello World" }) => {
  return (
    <div>
        {/* say hello world when click button */}
        <Button color="success"
            onClick={() => {
                console.log('Button was clicked');
                toast(text, 
                {
                  icon: '👏',
                  style: {
                    borderRadius: '10px',
                    background: 'background',
                    color: '#888',  
                  },
                }
              );
        }}>
        {text}
        </Button>
    </div>
  )
}

export default ToastButton