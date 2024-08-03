import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const Canvas = forwardRef(({ image, effects }, ref) => {
  const canvasRef = useRef(null);
  const emojiImage = useRef(new Image());
  const effectsImage = useRef(new Image());

  emojiImage.current.src = `${process.env.PUBLIC_URL}/images/emoji.png`;
  effectsImage.current.src = `${process.env.PUBLIC_URL}/images/effects.png`;

  useImperativeHandle(ref, () => ({
    addEmoji: () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(emojiImage.current, 200, 200, 50, 50);
    },
  }));

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);

        if (effects) {
          ctx.drawImage(effectsImage.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      };
    }
  }, [image, effects]);

  return <canvas ref={canvasRef} width="500" height="500"></canvas>;
});

export default Canvas;
