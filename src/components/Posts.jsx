import { useState, useEffect } from "react";
import { getPosts } from "../services/postService";
import Navbar from "./Navbar";
import Post from "./templates/Post";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();

        const filterResponse = response.filter(
          (post) => post.isPublished === true,
        );

        setPosts(filterResponse);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-white text-xl pl-4">Loading...</p>;
  if (error) return <p className="text-red-600 text-xl pl-4">Error: {error}</p>;
  return (
    <div className="min-h-screen w-screen  bg-[#1d3557]">
      <Navbar />
      <h1 className="text-white text-5xl mt-4 text-center ">Articles</h1>

      <ul className="w-full flex flex-col items-center mt-7">
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </ul>
    </div>
  );
}

export default Posts;
