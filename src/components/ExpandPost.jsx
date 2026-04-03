import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComments, postComments } from "../services/commentService";
import { getPost } from "../services/postService";

function ExpandPost() {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(`Error: ${err.response.data.message}`);
      } else {
        console.log("Something went wrong. Please try again.");
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
    <>
      <div>
        <h1>{post.title}</h1>
        <h4>{post.user.username}</h4>
        <p>{post.blog}</p>
      </div>
      <div>
        <h1>Comments</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="text">New Comment </label>
              <input
                value={userInput.text}
                name="text"
                id="text"
                onChange={handleChange}
                type="text"
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>

        <ul>
          {comments.map((comment) => (
            <li key={comment.id}> {comment.text} </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ExpandPost;
