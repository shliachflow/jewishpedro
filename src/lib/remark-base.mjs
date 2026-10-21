// Prefixes root-relative links/images in markdown (e.g. /images/x.png, /events) with the site base,
// so content files can use plain "/path" URLs and still work on a GitHub Pages sub-path.
import { visit } from 'unist-util-visit';

export function remarkBase({ base = '' } = {}) {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
    if (!prefix) return;
    visit(tree, ['link', 'image'], (node) => {
      if (node.url && node.url.startsWith('/') && !node.url.startsWith('//')) {
        node.url = prefix + node.url;
      }
    });
  };
}
