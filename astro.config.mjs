import { defineConfig } from 'astro/config';
import readingTime from "remark-reading-time";
import readingMdxTime from "remark-reading-time/mdx";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [
        mdx({
            remarkPlugins: [readingTime, readingMdxTime]
        }),
        tailwind()
    ]
});
