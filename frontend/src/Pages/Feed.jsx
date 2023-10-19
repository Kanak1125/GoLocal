import Navbar from "../Components/Navbar";
import Posts from "../Components/Posts";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const Feed = () => {

  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // console.log(data);

  // NOTE: we are using context to get the posts data in feed...
  // useEffect(() => {
  //   setLoading(true);

  //   const getDataFromApi = async () => {
  //     try {
  //       const response = await axios({
  //         method: "get",
  //         url: "http://127.0.0.1:8000/api/post-create-list/",
  //       });

  //       const data = await response.data;
  //       setData([...data]);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(`ERROR:${err}`);
  //       setLoading(false);
  //     }
  //   };

  //   getDataFromApi();
  //   console.log(data);
  // }, []);

  const navigate = useNavigate();

  return (
    <div className="">
      <Navbar />
      {/* <Post /> */}

      <main className='flex justify-center my-8 gap-8 max-w-[1400px] mx-auto'>
        <div className="feed flex flex-col break-words break-all px-3 w-full md:w-[70%]">
          <div className='mx-auto flex flex-col
          gap-4 items-center justify-between w-full p-5 rounded-lg bg-gray-100 sm:flex-row'>
            <div className="w-[40px] min-w-[40px] h-[40px] mx-2 rounded-full accent-color"></div>
            <p className='username font-bold'>Wanna post something?</p>
            <button
            onClick={() => navigate("/post")}
            className='w-full h-[40px] accent-color text-white font-bold rounded-full transition-all duration-300 sm:w-[100px]'
            >
            Post
            </button>
          </div>
          <Posts />
        </div>
        <Sidebar />
      </main>
    </div>
  );
};

export default Feed;