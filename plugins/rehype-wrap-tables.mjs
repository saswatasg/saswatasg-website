// Wraps every <table> emitted by MDX in <div class="table-wrap"> so wide
// tables can scroll horizontally without display:block on the table itself
// (which breaks column stretching).
export default function rehypeWrapTables() {
  return (tree) => {
    const visit = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'element' && child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-wrap'] },
            children: [child],
          };
        }
        visit(child);
        return child;
      });
    };
    visit(tree);
  };
}
