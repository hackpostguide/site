"use client";

import { useEffect } from "react";
import React from 'react'
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/config/site";

const Discord = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(siteConfig.links.discord);
  }, [router]);

  return null;
};

const DiscordRedirect = () => {
  return (
    <div>
        <Discord />
    </div>
  )
}

export default DiscordRedirect