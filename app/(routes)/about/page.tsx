import React from 'react'
import { siteConfig } from "@/app/config/site";
import { Link } from '@nextui-org/react';

const AboutPage = () => {
  return (
    <div>
      <h1>About Hackpost Guide 🚀</h1>
      <p>
        Hackpost Guide is an open-source web app developed to consolidate resources for hackathons and foster a community passionate about creating apps, games, websites, and projects. It is designed after scratch.mit.edu and dev.to. 
        <br /><br />
        Hackpost Guide promotes creativity and innovation, collaboration, and equity in computing.
        <br /><br />
        For now, feel free to make an account and check out some posts/guides that others have created! Make sure to follow the community guidelines and maintain a positive and respectful environment. 
        <br /><br />
        This project is still VERY much a work in progress and in its early stages. If you find a bug, or if you would like to contribute, check out our <Link className="text-lg leading-7" isExternal href={siteConfig.links.github} aria-label="Discord">Github </Link>. Make sure to also join our <Link className="text-lg leading-7" isExternal href={siteConfig.links.discord} aria-label="Discord"> Discord Server </Link>.
      </p>
    </div>
  )
}

export default AboutPage