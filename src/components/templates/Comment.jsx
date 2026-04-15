function Comment({ comment }) {
  return (
    <li
      className="
  w-[30%] border  text-2xl text-white border-indigo-500
  shadow-md rounded px-2 pt-2 pb-4 mb-7
  transform transition duration-300 ease-in-out

  "
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
  );
}

export default Comment;
