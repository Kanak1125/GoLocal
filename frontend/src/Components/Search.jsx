import React from "react";

const Search = (props) => {
  return (
    <div className='mx-auto max-w-[1400px] flex ml-6'>
      <form>
        <input
          className='w-full h-10 px-4 py-2 placeholder-text rounded-full focus:outline-none focus:shadow-outline border-solid border-accent'
          type='search'
          placeholder='Search'
          value={props.searchInput}
          onChange={props.searchHandler}
        />
      </form>
    </div>
  );
};

export default Search;
