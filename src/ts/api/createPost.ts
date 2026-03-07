import type { PostsType } from "../types/postsType";

export async function createPost(newPostData: PostsType) {
    const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer kalle123" // Placeholder API key
        },
        body: JSON.stringify(newPostData)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ved oppretting av post`);
    } else {
        console.log("Post opprettet med data:", newPostData);
    }
}