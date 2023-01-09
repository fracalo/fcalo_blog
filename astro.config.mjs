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
function shiftHeadingDown() {
  return tree => {
    visit(tree, 'element', node => {
      if (['h1', 'h2', 'h3', 'h4', 'h5'].includes(node.tagName)) {
        node.tagName = 'h' + (Number(node.tagName.charAt(1)) + 1);
      }
    });
  };
}

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  markdown: {
    extendDefaultPlugins: true,
    draft: true,
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'nord',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      //langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    }
  },
  integrations: [mdx({
    extendDefaultPlugins: true,
    draft: true,
    remarkPlugins: [rehypeAccessibleEmojis, readingTime, readingMdxTime],
    rehypePlugins: [shiftHeadingDown]
  }), tailwind(), image()]
});
