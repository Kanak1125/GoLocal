import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";

const Post = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getDataFromApi = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/post-create-list/",
        });

        const data = await response.data;
        setData([...data]);
        setLoading(false);
      } catch (err) {
        console.log(`ERROR:${err}`);
        setLoading(false);
      }
    };

    getDataFromApi();
    console.log(data);
  }, []);

  const { open, openModal, closeModal } = props;
  return <PostItem open={open} openModal={openModal} closeModal={closeModal} />;
};

export default Post;
