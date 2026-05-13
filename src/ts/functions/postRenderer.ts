/*Alex Harsvik*/
import { getPostsForMeetup } from "../api/postFetcher";
import type { Post } from "../types/postsType";
import type { CommentsType } from "../types/commentsType";
import { formatDate } from "./dateFormatter";

const currentUserId = 1; // Placeholder

export async function renderPostsForMeetup(meetupId: number) {
  try {
    const posts: Post[] = await getPostsForMeetup(meetupId);

    //sorterer kommentarene sånn at de nyeste kommer øverst
    posts.sort((a, b) => {
      if (a.created > b.created) {
        return -1;
      } else if (a.created < b.created) {
        return 1;
      } else {
        return 0;
      }
    });

    const postsListContainer = document.querySelector(
      ".posts-list",
    ) as HTMLElement;
    if (postsListContainer) {
      postsListContainer.innerHTML = "";
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const header = document.createElement("div");
        header.classList.add("post-header");
        const username = document.createElement("span");
        username.classList.add("post-username");
        username.textContent = `User ${post.userId}`;
        const timestamp = document.createElement("span");
        timestamp.classList.add("post-timestamp");
        timestamp.textContent = formatDate(post.created);
        header.append(username, " • ", timestamp);

        const body = document.createElement("div");
        body.classList.add("post-body");
        body.textContent = post.text;

        const actions = document.createElement("div");
        actions.classList.add("post-actions");
        
        const replyBtn = document.createElement("button");
        replyBtn.textContent = "Reply";
        replyBtn.classList.add("btn-reply");
        actions.appendChild(replyBtn);

        if (post.userId === currentUserId) {
          const editBtn = document.createElement("button");
          editBtn.textContent = "Edit";
          editBtn.classList.add("btn-edit");
          
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.classList.add("btn-delete");

          actions.append(editBtn, deleteBtn);
        }

        //svar seksjonen
        const repliesContainer = document.createElement("div");
        repliesContainer.classList.add("post-replies");

        if (post.comments && post.comments.length > 0) {
          post.comments.forEach((comment) => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            const commentHeader = document.createElement("div");
            commentHeader.classList.add("comment-header");
            commentHeader.textContent = `User ${comment.userId} • ${formatDate(comment.created)}`;

            const commentBody = document.createElement("div");
            commentBody.classList.add("comment-body");
            commentBody.textContent = comment.comment;

            const commentActions = document.createElement("div");
            commentActions.classList.add("comment-actions");

            if (comment.userId === currentUserId) {
              const editCommentBtn = document.createElement("button");
              editCommentBtn.textContent = "Edit";
              editCommentBtn.classList.add("btn-edit-comment");
              
              const deleteCommentBtn = document.createElement("button");
              deleteCommentBtn.textContent = "Delete";
              deleteCommentBtn.classList.add("btn-delete-comment");

              commentActions.append(editCommentBtn, deleteCommentBtn);
            }

            commentElement.append(commentHeader, commentBody, commentActions);
            repliesContainer.appendChild(commentElement);
          });
        }

        postElement.append(header, body, actions, repliesContainer);
        postsListContainer.appendChild(postElement);
      });
    }
  } catch (error) {
    console.error("Feil ved henting av poster:", error);
  }
}
