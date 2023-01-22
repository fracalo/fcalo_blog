import { defineConfig } from 'astro/config';
import readingTime from "remark-reading-time";
import readingMdxTime from "remark-reading-time/mdx";
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

// https://astro.build/config
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import { visit } from 'unist-util-visit';

/** @type {import('unified').Plugin<[], import('hast').Root>} */
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import critters from "astro-critters";
import partytown from "@astrojs/partytown";


const { VITE_SITE } = import.meta.env;

function shiftHeadingDown() {
  return tree => {
    visit(tree, 'element', node => {
      if (['h1', 'h2', 'h3', 'h4', 'h5'].includes(node.tagName)) {
        node.tagName = 'h' + (Number(node.tagName.charAt(1)) + 1);
      }
    });
  };
}

if (! VITE_SITE) {
    console.log('need to provide VITE_SITE for build')
    exit(2)
}
export default defineConfig({
  site: VITE_SITE,
  markdown: {
    extendDefaultPlugins: true,
    draft: true,
    shikiConfig: {
      theme: 'nord',
      //langs: [],
      wrap: true
    }
  },
  integrations: [mdx({
    extendDefaultPlugins: true,
    draft: true,
    remarkPlugins: [rehypeAccessibleEmojis, readingTime, readingMdxTime],
    rehypePlugins: [shiftHeadingDown]
  }), tailwind(), image(), sitemap(), prefetch(), critters(), partytown()],
  server: {
    host: true,
    port: 3002
  }
});
