function CommentForm({ userInput, errorComment, handleSubmit, handleChange }) {
  return (
    <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
      {errorComment && <p className="text-xl text-red-600 ">{errorComment}</p>}
      <div className="flex flex-col items-center w-full">
        <textarea
          className="w-[30%] min-h-36 mt-3 mb-3 text-xl bg-[#1d3557] text-white p-3 rounded border border-gray-400 focus:outline-none"
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
  );
}

export default CommentForm;
