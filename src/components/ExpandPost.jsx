import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useState, useEffect } from "react";

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

    const response = await api.post(`/posts/${id}/comments`, userInput);

    console.log(response.data.text);

    setUserInput({ text: "" });

    setComments([...comments, response.data]);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resPost = await api.get(`/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const resComment = await api.get(`/posts/${id}/comments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setComments(resComment.data);
        setPost(resPost.data);
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
