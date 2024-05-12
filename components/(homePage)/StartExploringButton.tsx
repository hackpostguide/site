'use client';

import React from 'react'
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/Primitives";

const StartExploringButton = () => {
    const handleExploreClick = () => {
		const exploreSection = document.getElementById('explore');
		if (exploreSection) {
		  exploreSection.scrollIntoView({ behavior: 'smooth' });
		}
	  };

    return (
        <div>
            <Button
                className={`${buttonStyles({ color: "secondary", variant: "shadow" })} text-xs sm:text-sm`}
                onClick={handleExploreClick} // Add the onClick handler
            >
                Start Exploring
            </Button>
        </div>
    )
}

export default StartExploringButton