// wimsta-embed — drop WIMSTA health & fitness calculators into any page or framework.
// Free to use. Widgets are served from wimsta.com, so fixes reach every install
// without a package update. Please keep the visible "WIMSTA" credit link.
import { calculators } from './catalog.js';

export { calculators };

export const SITE = 'https://wimsta.com';

const byId = Object.fromEntries(calculators.map((c) => [c.id, c]));

function pick(id) {
  const def = byId[id];
  if (!def) {
    throw new Error(
      `wimsta-embed: unknown calculator "${id}". Known: ${calculators.map((c) => c.id).join(', ')}`
    );
  }
  return def;
}

function norm(opts = {}) {
  return {
    theme: opts.theme === 'light' ? 'light' : 'dark',
    lang: opts.lang === 'es' ? 'es' : 'en',
    width: Number(opts.width) > 0 ? Number(opts.width) : 480,
  };
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/**
 * Paste-ready HTML for a calculator (static sites, CMS blocks, SSR).
 * Native widgets → one <script>; the rest → <iframe> + auto-resizer + credit link.
 */
export function snippet(id, opts) {
  const def = pick(id);
  const { theme, lang, width } = norm(opts);
  if (def.native) {
    return `<script async src="${SITE}/embed/${def.id}.js" data-theme="${theme}" data-lang="${lang}"></script>`;
  }
  return [
    `<iframe src="${SITE}/embed/${def.id}/?theme=${theme}" width="100%" height="${def.height}" loading="lazy" scrolling="no"`,
    `  style="border:0;width:100%;max-width:${width}px" title="${esc(def.title)} by WIMSTA"></iframe>`,
    `<script src="${SITE}/embed.js" async></script>`,
    `<p style="font:13px/1.5 system-ui,sans-serif;margin:8px 0 0">Calculator by <a href="${SITE}/${def.slug}/" target="_blank" rel="noopener">WIMSTA — ${esc(def.title)}</a></p>`,
  ].join('\n');
}

let resizerLoaded = false;
function loadResizer(doc) {
  if (resizerLoaded || doc.querySelector(`script[src="${SITE}/embed.js"]`)) return;
  resizerLoaded = true;
  const s = doc.createElement('script');
  s.src = `${SITE}/embed.js`;
  s.async = true;
  doc.head.appendChild(s);
}

/**
 * Render a calculator into an element (browser only). Returns an unmount function.
 * @param {Element|string} target element or CSS selector
 * @param {string} id calculator id, e.g. "bmi" — see `calculators`
 * @param {{theme?: 'dark'|'light', lang?: 'en'|'es', width?: number}} [opts]
 */
export function mount(target, id, opts) {
  if (typeof document === 'undefined') throw new Error('wimsta-embed: mount() needs a browser; use snippet() on the server');
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) throw new Error(`wimsta-embed: target not found: ${target}`);
  const def = pick(id);
  const { theme, lang, width } = norm(opts);
  const box = document.createElement('div');
  box.className = 'wimsta-embed-box';
  box.setAttribute('data-calculator', def.id);

  if (def.native) {
    // The widget script mounts itself right after its own <script> tag.
    const s = document.createElement('script');
    s.async = true;
    s.src = `${SITE}/embed/${def.id}.js`;
    s.setAttribute('data-theme', theme);
    s.setAttribute('data-lang', lang);
    box.appendChild(s);
  } else {
    const f = document.createElement('iframe');
    f.src = `${SITE}/embed/${def.id}/?theme=${theme}`;
    f.width = '100%';
    f.height = String(def.height);
    f.loading = 'lazy';
    f.setAttribute('scrolling', 'no');
    f.title = `${def.title} by WIMSTA`;
    f.style.cssText = `border:0;width:100%;max-width:${width}px`;
    const p = document.createElement('p');
    p.style.cssText = 'font:13px/1.5 system-ui,sans-serif;margin:8px 0 0';
    p.append('Calculator by ');
    const a = document.createElement('a');
    a.href = `${SITE}/${def.slug}/`;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = `WIMSTA — ${def.title}`;
    p.appendChild(a);
    box.append(f, p);
    loadResizer(document);
  }
  el.appendChild(box);
  return () => box.remove();
}
