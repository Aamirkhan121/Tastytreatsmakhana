import React from "react";
import {InstagramEmbed} from "react-social-media-embed"

const Instagram = () => {

    const reels = [
  {
    id: "1",
    url: "https://www.instagram.com/p/DMSdsFVOT19/?utm_source=ig_embed&amp;utm_campaign=loading",
    title: "Cleaning tips video by expert"
  },
  {
    id: "2",
    url: "https://www.instagram.com/reel/DMKv_xiJZ2Y/?utm_source=ig_embed&amp;utm_campaign=loading",
    title: "Client review reel"
  },
  {
    id: "3",
    url: "https://www.instagram.com/reel/DMDA43Nptpz/?utm_source=ig_embed&amp;utm_campaign=loading",
    title: "Professional service clip"
  }
];

  return (
   <>
    <section className="py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Instagram Reels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {reels.map((reel) => (
          <div key={reel.id} className="rounded overflow-hidden shadow-md">
            <InstagramEmbed url={`${reel.url}embed`} width="100%" />
            {/* SEO Fallback (in case iframe doesn’t load) */}
            <p className="sr-only">{reel.title}</p>
          </div>
        ))}
      </div>
    </section>
   </>
  );
};

export default Instagram;
