import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const navigate = useNavigate();
  return (
    <li
      className="
  w-[50%] border-2 text-center text-4xl text-white border-indigo-500
  shadow-md rounded px-8 pt-8 pb-12 mb-7
  transform transition duration-300 ease-in-out
  hover:bg-indigo-500/20
  hover:scale-105
  hover:shadow-xl
  hover:text-gray-300
  hover:cursor-pointer
"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      {post.title}
      <p className="text-lg mt-4">{post.user.username}</p>
      <p className="text-lg mt-4">
        {post.uploadAt
          ? new Date(post.uploadAt).toLocaleDateString("en-US")
          : "No date available"}
      </p>
    </li>
  );
}

export default Post;
