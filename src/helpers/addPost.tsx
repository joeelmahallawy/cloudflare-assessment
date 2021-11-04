import { API_ENDPOINT, months } from "../configs/configs";
import ordinal from "ordinal";

const addPost = async (
  userName: string,
  postContent: string,
  postTitle: string
) => {
  fetch(API_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      title: postTitle,
      content: postContent,
      username: userName,
      postedAt: `${months[new Date().getMonth()]} ${ordinal(
        new Date().getDate()
      )}, ${new Date().getFullYear()}`,
    }),
    mode: "no-cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
export default addPost;
