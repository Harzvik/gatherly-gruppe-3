import type { CommentsType } from "./commentsType";

export type PostsType = {
    id: number;
    meetupId: number;
    userId: number;
    postName: string;
    text: string;
    likes: number;
    dislikes: number;
    comments: CommentsType[];
    created: string;
    updated: string;
}