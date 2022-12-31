import type { MarkdownInstance } from "astro";

const { VITE_PAGE_SIZE } = import.meta.env

type MyFrontmatter = {
    category: Array<string>;
    title: string
    summary: string
    date: string
}

type Post = MarkdownInstance<MyFrontmatter> & { readingTime: { text: string }}
type Posts = Array<Post>

const orderPosts = (posts: Posts) : Posts => {
    posts.sort((a, b) => {
        const aDate = a.frontmatter.date || 0
        const bDate = b.frontmatter.date || 0 
        return new Date(bDate).getTime() - new Date(aDate).getTime()
    })

    return posts
}

const pagePosts = (posts: Posts, pageSize: number, page: number) : Posts => 
    posts.slice((page - 1) * pageSize, page * pageSize)

const mappedPosts = (posts: Posts) : Posts => 
    posts.map(x => {
        console.log(x.readingTime)
        return x
    })


const pageSize = VITE_PAGE_SIZE

export { pageSize, pagePosts, orderPosts, mappedPosts, Post }
