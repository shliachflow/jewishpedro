// Turns a markdown page into designed sections without changing its words:
// each "## Heading" plus what follows becomes a two-column row (heading left, content right).
// layout "faq": each "## Question" becomes an accordion item. layout "index": left untouched.

const isH2 = (n) => n.type === 'element' && n.tagName === 'h2';
const el = (tagName, properties, children) => ({ type: 'element', tagName, properties, children });

// A paragraph that is only links (e.g. "[Join on Zoom] [Download]") becomes a row of buttons.
function markLinkRows(nodes) {
  for (const n of nodes) {
    if (n.type !== 'element') continue;
    if (n.tagName === 'p') {
      const parts = n.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
      if (parts.length && parts.every((c) => c.type === 'element' && c.tagName === 'a')) {
        n.properties = { ...n.properties, className: [...(n.properties?.className ?? []), 'cta-row'] };
      }
    } else if (n.children) markLinkRows(n.children);
  }
}

export function rehypeSections() {
  return (tree, file) => {
    markLinkRows(tree.children);
    const layout = file.data?.astro?.frontmatter?.layout;
    if (layout === 'index') return;
    const kids = tree.children;
    if (layout === 'faq') return faq(tree);
    const first = kids.findIndex(isH2);
    if (first === -1) return;
    const intro = kids.slice(0, first);
    const groups = [];
    for (const n of kids.slice(first)) {
      if (isH2(n)) groups.push({ head: n, body: [] });
      else groups[groups.length - 1].body.push(n);
    }
    const out = [];
    if (intro.some((n) => n.type === 'element')) out.push(el('div', { className: ['pg-intro'] }, intro));
    else out.push(...intro);
    if (layout === 'faq') {
      const items = groups.map((g) => el('details', { className: ['faq-item'] }, [
        el('summary', {}, [el('h2', { id: g.head.properties?.id }, g.head.children)]),
        el('div', { className: ['faq-a'] }, g.body),
      ]));
      out.push(el('div', { className: ['faq-list'] }, items));
    } else {
      for (const g of groups) {
        if (!g.body.some((n) => n.type === 'element')) continue; // a heading with nothing under it
        out.push(el('section', { className: ['pg-sec'] }, [
          el('div', { className: ['pg-sec-head'] }, [g.head]),
          el('div', { className: ['pg-sec-body'] }, g.body),
        ]));
      }
    }
    tree.children = out;
  };
}

const text = (n) => (n.type === 'text' ? n.value : (n.children ?? []).map(text).join(''));
const isH3 = (n) => n.type === 'element' && n.tagName === 'h3';

// FAQ pages: each "### Question" becomes an accordion item. The jump-list and per-answer "Back to top" links are redundant once answers collapse.
function faq(tree) {
  const kids = tree.children;
  const first = kids.findIndex(isH3);
  if (first === -1) return;
  const groups = [];
  for (const n of kids.slice(first)) {
    if (isH3(n)) groups.push({ head: n, body: [] });
    else if (!/^Back to top/.test(text(n).trim())) groups[groups.length - 1].body.push(n);
  }
  const items = groups.filter((g) => !/^Quick Navigation$/i.test(text(g.head).trim())).map((g) => el('details', { className: ['faq-item'] }, [
    el('summary', {}, [el('h3', { id: g.head.properties?.id }, g.head.children)]),
    el('div', { className: ['faq-a'] }, g.body),
  ]));
  tree.children = [el('div', { className: ['pg-intro'] }, kids.slice(0, first)), el('div', { className: ['faq-list'] }, items)];
}
