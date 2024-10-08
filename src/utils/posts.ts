import type { MarkdownInstance } from "astro";

const { VITE_PAGE_SIZE } = import.meta.env;

type MyFrontmatter = {
  category: Array<string>;
  title: string;
  summary: string;
  date: string;
  draft?: boolean;
  social_image?: string;
};

type Post = MarkdownInstance<MyFrontmatter> & { readingTime: { text: string } };
type Posts = Array<Post>;

const orderPosts = (posts: Posts): Posts => {
  posts.sort((a, b) => {
    const aDate = a.frontmatter.date || 0;
    const bDate = b.frontmatter.date || 0;
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  return posts;
};

const pagePosts = (posts: Posts, pageSize: number, page: number): Posts =>
  posts.slice((page - 1) * pageSize, page * pageSize);

const mappedPosts = (posts: Posts): Posts =>
  posts.map((x) => {
    console.log(x.readingTime);
    return x;
  });

const getFormattedDate = (date: string): null | string => {
  let formattedDate = null;
  if (date) {
    const [_, month, day, year] = new Date(date).toDateString().split(" ");
    formattedDate = `${month} ${Number(day)}, ${year}`;
  }
  return formattedDate;
};

const postCategories = (posts: Posts): Record<string, Array<Post>> =>
  posts.reduce<Record<string, Array<Post>>>((ac, x) => {
    if (!x.frontmatter.category) {
      return ac;
    }
    return x.frontmatter.category.reduce(
      (ac2, c) => ({
        ...ac2,
        [c.toLowerCase()]: [...(ac2[c.toLowerCase()] || []), x],
      }),
      ac
    );
  }, {});

const pageSize = VITE_PAGE_SIZE;

export type { Post };
export { pageSize, pagePosts, orderPosts, mappedPosts, getFormattedDate, postCategories };
