import { defineConfig } from "astro/config";
import readingTime from "remark-reading-time";
import readingMdxTime from "remark-reading-time/mdx";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import { visit } from "unist-util-visit";

/** @type {import('unified').Plugin<[], import('hast').Root>} */
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import critters from "astro-critters";
import partytown from "@astrojs/partytown";
import fs from "fs/promises";
import path from "path";
const {
  VITE_SITE
} = import.meta.env;
function shiftHeadingDown() {
  return tree => {
    visit(tree, "element", node => {
      if (["h1", "h2", "h3", "h4", "h5"].includes(node.tagName)) {
        node.tagName = "h" + (Number(node.tagName.charAt(1)) + 1);
      }
    });
  };
}
if (!VITE_SITE) {
  console.log("need to provide VITE_SITE for build");
  //exit(2);
}
const mySwPlugin = options => {
  let config;
  return {
    name: "customSw",
    hooks: {
      "astro:config:done": async ({
        config: cfg
      }) => {
        config = cfg;
      },
      "astro:build:done": async args => {
        const injection = `
                    <script>
                        if ('serviceWorker' in navigator) {
                            window.addEventListener('load', () => {
                                navigator.serviceWorker.register('/sw.js');
                            });
                        }
                    </script>`.split("\n").map(x => x.trim()).join("");
        const indexPath = path.join(config.outDir.pathname, "index.html");
        const indexHtml = await fs.readFile(indexPath, "utf8");
        const indexHtml2 = indexHtml.replace("</head>", injection + "</head>");
        await fs.writeFile(indexPath, indexHtml2);
      }
    }
  };
};

// https://astro.build/config
export default defineConfig({
  site: VITE_SITE,
  markdown: {
    extendDefaultPlugins: true,
    draft: true,
    shikiConfig: {
      theme: "nord",
      //langs: [],
      wrap: true
    }
  },
  integrations: [mdx({
    extendDefaultPlugins: true,
    draft: true,
    remarkPlugins: [rehypeAccessibleEmojis, readingTime, readingMdxTime],
    rehypePlugins: [shiftHeadingDown]
  }), tailwind(), sitemap(), prefetch(), critters(), partytown(), mySwPlugin()]
});
