'use client';

import React from 'react'
import { Button } from "@/components/ui/button";
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
                className={"text-xs sm:text-sm"}
                onClick={handleExploreClick} // Add the onClick handler
            >
                Start Exploring
            </Button>
        </div>
    )
}

export default StartExploringButton