/*Alex Harsvik*/
import { getPostsForMeetup } from "../api/postFetcher";
import { deletePost } from "../api/deletePost";
import { updatePost } from "../api/updatePost";
import { getCurrentUserId } from "./userManagement";
import type { Post } from "../types/postsType";
import type { CommentsType } from "../types/commentsType";
import { formatDate } from "./dateFormatter";

export async function renderPostsForMeetup(meetupId: number) {
  const currentUserId = getCurrentUserId();
  
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
        
        //reply funsjonalitet
        const replyBtn = document.createElement("button");
        replyBtn.textContent = "Reply";
        replyBtn.classList.add("btn-reply");
        actions.appendChild(replyBtn);
        
        const replyFormContainer = document.createElement("div");
        replyFormContainer.classList.add("reply-form-container");
        replyFormContainer.style.display = "none";
        
        replyBtn.addEventListener("click", () => {
          if (replyFormContainer.style.display === "none") {
            replyFormContainer.style.display = "flex";
            replyFormContainer.innerHTML = `
              <input type="text" placeholder="Skriv et svar..." class="reply-input" />
              <button class="reply-submit-btn">Send</button>
            `;
            const submitBtn = replyFormContainer.querySelector("button");
            const inputField = replyFormContainer.querySelector("input");
            
            submitBtn?.addEventListener("click", async () => {
              const text = inputField?.value;
              if (!text || text.trim() === "") return alert("Svaret kan ikke være tomt.");
              
              try {
                const newComment = {
                  id: Date.now(), //HVORFOR GJØR IKKE BACKEND DETTE????? jeg er dum og forvirra
                  userId: currentUserId,
                  comment: text,
                  created: new Date().toISOString(), //jeg trodde at backend skulle lage dette men får det ikke til å funke så gjør det her for å få det til å vises i UI
                } as CommentsType;
                
                if (!post.comments) {
                  post.comments = [];
                }
                post.comments.push(newComment);
                
                await updatePost(post.id, post);
                renderPostsForMeetup(meetupId);
              } catch (error) {
                console.error("Feil ved oppretting av kommentar:", error);
                alert("Kunne ikke sende svaret.");
              }
            });
          } else {
            replyFormContainer.style.display = "none";
          }
        });

        if (post.userId === currentUserId) {
          //edit knapp
          const editBtn = document.createElement("button");
          editBtn.textContent = "Edit";
          editBtn.classList.add("btn-edit");
          editBtn.addEventListener("click", async () => {
            const isEditing = body.querySelector("input");
            if (isEditing) {
              const inputField = body.querySelector("input") as HTMLInputElement;
              const newText = inputField.value;
              if (newText.trim() === "") return alert("Posten kan ikke være tom.");
              
              try {
                await updatePost(post.id, { ...post, text: newText });
                renderPostsForMeetup(meetupId);
              } catch (error) {
                console.error("Feil ved oppdatering av post:", error);
                alert("Kunne ikke oppdatere posten.");
              }
            } else {
              body.innerHTML = "";
              const inputField = document.createElement("input");
              inputField.type = "text";
              inputField.value = post.text;
              inputField.classList.add("edit-input");
              body.appendChild(inputField);
              editBtn.textContent = "Save";
            }
          });
          
          //delete knapp
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.classList.add("btn-delete");
          deleteBtn.addEventListener("click", async () => {
            if (confirm("Er du sikker på at du vil slette denne posten?")) {
              try {
                await deletePost(post.id);
                
                renderPostsForMeetup(meetupId);
              } catch (error) {
                console.error("Feil ved sletting av post:", error);
                alert("Kunne ikke slette posten.");
              }
            }
          });

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
              editCommentBtn.addEventListener("click", async () => {
                const isEditing = commentBody.querySelector("input");
                if (isEditing) {
                  const inputField = commentBody.querySelector("input") as HTMLInputElement;
                  const newText = inputField.value;
                  if (newText.trim() === "") return alert("Svaret kan ikke være tomt.");
                  
                  try {
                    const targetComment = post.comments.find(c => c.id === comment.id);
                    if (targetComment) {
                      targetComment.comment = newText;
                      await updatePost(post.id, post);
                    }
                    renderPostsForMeetup(meetupId);
                  } catch (error) {
                    console.error("Feil ved oppdatering av kommentar:", error);
                    alert("Kunne ikke oppdatere svaret.");
                  }
                } else {
                  commentBody.innerHTML = "";
                  const inputField = document.createElement("input");
                  inputField.type = "text";
                  inputField.value = comment.comment;
                  inputField.classList.add("edit-input");
                  commentBody.appendChild(inputField);
                  editCommentBtn.textContent = "Save";
                }
              });
              
              const deleteCommentBtn = document.createElement("button");
              deleteCommentBtn.textContent = "Delete";
              deleteCommentBtn.classList.add("btn-delete-comment");
              deleteCommentBtn.addEventListener("click", async () => {
                if (confirm("Er du sikker på at du vil slette dette svaret?")) {
                  try {
                    post.comments = post.comments.filter(c => c.id !== comment.id);
                    await updatePost(post.id, post);
                    // Re-render posts after deletion
                    renderPostsForMeetup(meetupId);
                  } catch (error) {
                    console.error("Feil ved sletting av kommentar:", error);
                    alert("Kunne ikke slette kommentaren.");
                  }
                }
              });

              commentActions.append(editCommentBtn, deleteCommentBtn);
            }

            commentElement.append(commentHeader, commentBody, commentActions);
            repliesContainer.appendChild(commentElement);
          });
        }

        postElement.append(header, body, actions, replyFormContainer, repliesContainer);
        postsListContainer.appendChild(postElement);
      });
    }
  } catch (error) {
    console.error("Feil ved henting av poster:", error);
  }
}
