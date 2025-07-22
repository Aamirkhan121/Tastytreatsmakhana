import React, { useEffect } from "react";

const InstagramEmbed = ({ url }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="instagram-embed">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#fff",
          border: "none",
          margin: "1rem auto",
          maxWidth: "100%",
        }}
      ></blockquote>
    </div>
  );
};

export default InstagramEmbed;
