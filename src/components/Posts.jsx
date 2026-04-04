import { useState, useEffect } from "react";
import { getPosts } from "../services/postService";
import Navbar from "./Navbar";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();

        setPosts(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <Navbar />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {" "}
            <a href={`/${post.id}`}>{post.title}</a>{" "}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Posts;
