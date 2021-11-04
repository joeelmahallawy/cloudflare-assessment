import months from "../configs/months";
const addPost = async (
  userName: string,
  postContent: string,
  postTitle: string
) => {
  if (userName.length < 20 && postContent && postTitle) {
    fetch("http://127.0.0.1:8787/posts", {
      method: "POST",
      body: JSON.stringify({
        title: postTitle,
        content: postContent,
        username: userName,
        postedAt: `${
          months[new Date().getMonth()]
        } ${new Date().getDate()}, ${new Date().getFullYear()}`,
      }),
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
};
export default addPost;
