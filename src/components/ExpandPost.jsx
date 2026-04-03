import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useState, useEffect } from "react";

function ExpandPost() {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

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
