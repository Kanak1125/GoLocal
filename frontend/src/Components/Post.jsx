import React, { useState } from "react";
import PostModal from "./PostModal";

const Post = () => {
  const [open, setOpen] = useState(false);
  

  return (
    <div>
      <button onClick={() => setOpen(true)}>Post</button>
      <PostModal 
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Post;
