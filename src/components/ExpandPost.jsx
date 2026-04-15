import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComments, postComments } from "../services/commentService";
import { getPost } from "../services/postService";
import CommentForm from "./forms/CommentForm";
import Comment from "./templates/Comment";
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

  if (loading) return <p className="text-white text-xl pl-4">Loading...</p>;
  if (error) return <p className="text-red-600 text-xl pl-4">Error: {error}</p>;

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
          <CommentForm
            userInput={userInput}
            errorComment={errorComment}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </div>

        <ul className="w-full flex flex-col items-center mt-4">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpandPost;
