// parse the description DOM into HTML
export const parseDom = (DOM) => {
  if (DOM === undefined) return;
  if (DOM[0] === '?') return 'No description available';

  return DOM.map((parent, idx) => {
    if (typeof parent === 'string') return parent;

    const Tag = parent.tag;
    const parentAttributes = parent.attributes;
    if (parent.tag === 'a') parentAttributes.target = '_blank';

    return (
      <Tag key={`key-${idx}`} {...parentAttributes}>
        {parseDom(parent.children)}
      </Tag>
    );
  });
};
