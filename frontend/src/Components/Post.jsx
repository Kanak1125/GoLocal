import React from "react";

const Post = () => {
  function openModal() {
    return {};
  }
  return (
    <div>
      <input
        type='text'
        placeholder='Post Your destination'
        onClick={openModal}
      />
    </div>
  );
};

export default Post;
