import React from "react";

const PostModal = (props) => {
  const { open, setOpen } = props;
  return (
    <>
    {open && <div className='absolute min-h-screen bg-black/60 flex items-center justify-center w-full' style={{height: "100vh !important"}}>
                    <div className='bg-white w-[80%] md:w-[555px] rounded-md z-10'>
                        <h2 className='text-2xl text-center font-semibold py-4'>Add your category</h2>
                        <hr />
                        <form  className='p-4 flex flex-col'>
                    <label htmlFor="word">Category </label>
                    <input
                        type="text"
                        id='word'
                        // ref={categoryRef}
                        className='mb-5 border-2 border-slate-200 py-1 px-2 mt-1 rounded'
                        placeholder='e.g. modern newa'
                        required
                    />
                    <label htmlFor="pronunciation">Language </label>
                    <input
                        type="text"
                        id='pronunciation'
                        // ref={languageRef}
                        className='mb-5 border-2 border-slate-200 py-1 px-2 mt-1 rounded'
                        placeholder='e.g. Newari'
                        required
                    />
                    <footer className='ml-auto'>
                        <input type="submit" value="Add" className='cursor-pointer bg-cyan-400 hover:bg-cyan-500 text-white h-8 w-20 rounded transition'/>
                        <button className='cursor-pointer border-2 border-slate-500 hover:bg-slate-500 hover:text-white text-slate-500 h-8 w-20 rounded transition ml-4'
                        onClick={() => setOpen(false)}
                        >Close</button>
                    </footer>
                        </form>
                    </div>
                </div>}
    </>
  )
};

export default PostModal;
