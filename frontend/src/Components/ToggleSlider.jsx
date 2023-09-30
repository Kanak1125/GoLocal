import React from "react";

const ToggleSlider = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [diffcult, setDiffcult] = React.useState("");
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  function handleChange(event) {
    const { checked } = event.target;

    setDiffcult((level) => {
      level = checked;
    });
  }
  return (
    <div className="mt-3">
      <label className='switch'>
        <input type='checkbox' checked={isChecked} onChange={handleToggle} />
        <span className='slider'></span>
      </label>

      {isChecked && (
        <div>
          <label htmlFor='difficulty'>Select Diffculty</label>
          <select
            name='difficulty'
            id='difficulty'
            className="my-3 border-accent-2 rounded-md border-2 ml-2"
            value={diffcult}
            onChange={handleChange}
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
