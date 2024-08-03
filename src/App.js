import React, { useState, useRef } from 'react';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [effects, setEffects] = useState(false);
  const canvasRef = useRef(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEffectsToggle = () => {
    setEffects((prev) => !prev);
  };

  const handleAddEmoji = () => {
    canvasRef.current.addEmoji();
  };

  const handleReset = () => {
    setImage(null);
    setEffects(false);
  };

  return (
    <div className="app">
      <h1>Image Manipulation Tool</h1>
      <Controls
        onUpload={handleUpload}
        onEffectsToggle={handleEffectsToggle}
        onAddEmoji={handleAddEmoji}
        onReset={handleReset}
      />
      <Canvas ref={canvasRef} image={image} effects={effects} />
    </div>
  );
}

export default App;
