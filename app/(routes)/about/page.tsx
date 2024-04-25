import React from 'react';
import { siteConfig } from "@/app/config/site";
import { Link } from '@nextui-org/react';

const AboutPage = () => {
  return (
    <div>
      <h1>About Hackpost Guide 🚀</h1>
      <p>
        Hackpost Guide is an open-source web app developed to consolidate resources for hackathons and to foster a community passionate about creating apps, games, websites, and projects. It is inspired by scratch.mit.edu and dev.to.
        <br /><br />
        Hackpost Guide promotes creativity and innovation, collaboration, and equity in computing.
        <br /><br />
        For now, feel free to create an account and explore posts and guides created by others! Please ensure you follow the community guidelines and maintain a positive and respectful environment.
        <br /><br />
      </p>
      <div className="text-lg leading-7">
        This project is still very much a work in progress and in its early stages. If you encounter a bug, or if you would like to contribute, please check out our <Link className="text-lg leading-7" isExternal href={siteConfig.links.github} aria-label="Github">Github</Link>. Be sure to also join our <Link className="text-lg leading-7" isExternal href={siteConfig.links.discord} aria-label="Discord">Discord Server</Link>.
      </div>
      <div className='mt-16'>
        <h3 className='my-2'>Known Bugs</h3>
        <p>Sometimes, the homepage and explore page do not render; instead, an <u>Application error: a client-side exception has occurred</u> appears, indicating a problem with hydration (<u>Minified React error #423</u>) along with a <u>TypeError: Cannot destructure property &apos;parallelRouterKey&apos; of &apos;param&apos; as it is null</u>. This bug is still present and being addressed. If you would like to assist, please visit our GitHub repository.</p>
        <br />        
        <p>If you discover more bugs or issues, let us know either in our Discord Server or on Github.</p>
      </div>
    </div>
  );
}

export default AboutPage;
