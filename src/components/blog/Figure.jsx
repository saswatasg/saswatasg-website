import React from 'react';

const Figure = ({ src, alt, caption, max }) => (
  <figure className="my-8">
    <img
      src={src}
      alt={alt || caption || ''}
      loading="lazy"
      className="blog-figure-img"
      style={max ? { maxWidth: max } : undefined}
    />
    {caption && <figcaption className="blog-figcaption">{caption}</figcaption>}
  </figure>
);

export default Figure;