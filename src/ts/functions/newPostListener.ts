/* import type { PostsType } from "../types/postsType.ts";
import { getMeetupidFromURL } from "./getMeetupidFromURL.ts";

export async function setupNewPostListener() {
  const form = document.querySelector("#new-post-form") as HTMLFormElement;

    form.addEventListener(`submit`, async (event) => {
    event.preventDefault();
        let userId = 1; // Placeholder

        const postText = (document.querySelector("#post-text") as HTMLTextAreaElement).value;
        const meetupId = getMeetupidFromURL();
        const newPost: PostsType = {
            id: null,
            meetupId: meetupId,
            userId: userId,
            text: postText,
            likes: 0,
            dislikes: 0,
            comments: [],
            created: "",
            updated: ""
            };

        return newPost;
});
} */