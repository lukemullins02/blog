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
      const response = await postComments(id, userInput);

      setUserInput({ text: "" });

      setComments([...comments, response]);
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
    <div className="h-screen w-screen bg-[#1d3557]">
      {" "}
      <Navbar />
      <div className="w-full flex flex-col items-center mt-7 text-white">
        <h1 className="text-5xl mb-4">{post.title}</h1>
        <h4 className="text-2xl mb-4 text-gray-300">
          By: {post.user.username}
        </h4>
        <p className="text-xl mb-4 p-4">{post.blog}</p>
      </div>
      <div className="w-full text-white flex flex-col  mt-7">
        <h1 className="text-4xl mb-4 ml-2">Comments</h1>
        <div className="w-full flex flex-col items-center">
          <form onSubmit={handleSubmit}>
            {errorComment && <p>{errorComment}</p>}
            <div className=" flex flex-col">
              <input
                className="shadow appearance-none border rounded  py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
  w-[50%] border text-center text-2xl text-white border-indigo-500
  shadow-md rounded px-2 pt-2 pb-4 mb-7
  transform transition duration-300 ease-in-out

  "
              key={comment.id}
            >
              {" "}
              {comment.text}{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpandPost;
