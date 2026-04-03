import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useState, useEffect } from "react";

function ExpandPost() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(`/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setPost(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.blog}</p>
    </div>
  );
}

export default ExpandPost;
