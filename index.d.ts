export interface Calculator {
  /** frozen widget id, e.g. "bmi" */
  id: string;
  /** page slug on wimsta.com */
  slug: string;
  title: string;
  /** default iframe height, px */
  height: number;
  /** true → light one-script widget (shadow DOM, no iframe) */
  native: boolean;
}
export interface EmbedOptions {
  theme?: 'dark' | 'light';
  lang?: 'en' | 'es';
  /** max width of the iframe widget, px (default 480) */
  width?: number;
}
export declare const SITE: string;
export declare const calculators: Calculator[];
/** Paste-ready HTML for static sites, CMS blocks and SSR. */
export declare function snippet(id: string, opts?: EmbedOptions): string;
/** Render into an element or selector (browser). Returns an unmount function. */
export declare function mount(target: Element | string, id: string, opts?: EmbedOptions): () => void;
