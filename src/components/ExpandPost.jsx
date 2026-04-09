import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComments, postComments } from "../services/commentService";
import { getPost } from "../services/postService";
import Navbar from "./Navbar";

function ExpandPost() {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorComment, setErrorComment] = useState("");

  const { id } = useParams();

  const [userInput, setUserInput] = useState({
    text: "",
  });

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postComments(id, userInput);

      setUserInput({ text: "" });

      const response = await getComments(id);

      setComments([...response]);
    } catch (err) {
      if (err.response) {
        console.log(errorComment);
        setErrorComment(err.response.data.message);
      } else {
        setErrorComment("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resPost = await getPost(id);

        const resComment = await getComments(id);

        setComments(resComment);
        setPost(resPost);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen w-screen  bg-[#1d3557]">
      {" "}
      <Navbar />
      <div className="w-full flex flex-col items-center mt-7 text-white">
        <h1 className="text-5xl mb-4">{post.title}</h1>
        <h4 className="text-2xl mb-4 text-gray-300">
          By: {post.user.username}
        </h4>
        <p className="text-2xl mb-4 p-6">{post.blog}</p>
      </div>
      <div className="w-full text-white flex flex-col  mt-7">
        <h1 className="text-4xl mb-4 ml-10">Comments</h1>
        <div className="w-full flex flex-col items-center">
          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            {errorComment && (
              <p className="text-xl text-red-600 ">{errorComment}</p>
            )}
            <div className="flex flex-col items-center w-full">
              <textarea
                className="w-[30%] min-h-36 mt-3 mb-3 text-xl bg-[#1d3557] text-white p-3 rounded border border-gray-400 focus:outline-none"
                value={userInput.text}
                name="text"
                id="text"
                onChange={handleChange}
                type="text"
                required
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Add Comment
              </button>
            </div>
          </form>
        </div>

        <ul className="w-full flex flex-col items-center mt-4">
          {comments.map((comment) => (
            <li
              className="
  w-[30%] border  text-2xl text-white border-indigo-500
  shadow-md rounded px-2 pt-2 pb-4 mb-7
  transform transition duration-300 ease-in-out

  "
              key={comment.id}
            >
              <p className="text-xl mt-1">
                {comment.user.username}{" "}
                <span className="text-base text-gray-400">
                  {" "}
                  {comment.uploadAt
                    ? new Date(comment.uploadAt).toLocaleString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "No date available"}
                </span>
              </p>
              <p className="mt-3 text-2xl wrap-break-word  whitespace-pre-wrap">
                {comment.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpandPost;
