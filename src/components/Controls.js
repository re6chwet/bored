import React from 'react';

const Controls = ({ onUpload, onEffectsToggle, onAddEmoji, onReset }) => {
  return (
    <div className="controls">
      <input type="file" accept="image/*" onChange={onUpload} />
      <label>
        <input type="checkbox" onChange={onEffectsToggle} /> Effects
      </label>
      <button onClick={onAddEmoji}>Emoji</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default Controls;
