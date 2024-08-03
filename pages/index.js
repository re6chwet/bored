import { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'konva';
import useImage from 'use-image';
import Button from '@mui/material/Button';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Home() {
  const stageRef = useRef(null);
  const [images, setImages] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [boredImage] = useImage('/bored.png');
  const [effectImage] = useImage('/effect.png');

  const addBoredImage = () => {
    setImages([...images, { id: images.length + 1, src: boredImage[0] }]);
  };

  const addEffectImage = () => {
    setImages([...images, { id: images.length + 1, src: effectImage[0] }]);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;
      img.onload = () => {
        setUploadedImage(img);
      };
    };
    reader.readAsDataURL(file);
  };

  const resetCanvas = () => {
    setImages([]);
    setUploadedImage(null);
  };

  const downloadImage = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <head>
        <title>$BORED Meme Gen</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div>
        <Button onClick={addBoredImage}>Add $Bored</Button>
        <Button onClick={addEffectImage}>Add Effect</Button>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          style={{ display: 'none' }}
          id="upload-button"
        />
        <label htmlFor="upload-button">
          <Button component="span">Upload Image</Button>
        </label>
        <Button onClick={resetCanvas}>Reset</Button>
        <Button onClick={downloadImage}>Download Image</Button>
      </div>
      <Stage width={1080} height={1080} ref={stageRef} style={{ border: '1px solid black' }}>
        <Layer>
          {uploadedImage && (
            <KonvaImage
              image={uploadedImage}
              width={1080}
              height={1080}
            />
          )}
          {images.map((img) => (
            <TransformWrapper key={img.id} defaultScale={1} defaultPositionX={100} defaultPositionY={100}>
              <TransformComponent>
                <KonvaImage image={img.src} />
              </TransformComponent>
            </TransformWrapper>
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
