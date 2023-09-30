import React from "react";

const ToggleSlider = (props) => {
  // const { label } = props;

  return (
    <div className='mt-3 w-full flex items-center justify-between'>
      <label className='switch'>
        <input
          type='checkbox'
          checked={props.check}
          onChange={props.toggleFunction}
        />
        <span className='slider'></span>
      </label>

      {props.check && (
        <div>
          <label htmlFor='difficulty'>Select Diffculty</label>
          <select
            name='difficulty'
            id='difficulty'
            className='my-3 border-accent-2 rounded-md border-2 ml-2'
            value={props.difficulty}
            onChange={props.changeDiff}
          >
            <option value='easy'>Easy</option>
            <option value='moderate'>Moderate</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default ToggleSlider;
