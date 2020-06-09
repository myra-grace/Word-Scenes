import React, { useState, useRef, useEffect } from "react";

interface Props {
  handleChange: (event: React.FormEvent<HTMLCanvasElement>) => void;
}

const DrawField: React.FC<Props> = ({ handleChange }) => {
  // const [canvasData, setCanvasData] = useState<string | null | undefined>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [clear, setClear] = useState<boolean | null | undefined>(false);

  let drawing = false;
  let URL = "";

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    const draw = (event) => {
      if (!drawing) return;
      context.lineWidth = 2;
      context.lineCap = "round";
      context.strokeStyle = "#D6EAFF";
      context.shadowColor = "dodgerblue";
      context.shadowBlur = 20;
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
      context.beginPath();
      context.moveTo(event.offsetX, event.offsetY);
      context.imageSmoothingQuality = "high";
    };

    const start = (event) => {
      event.preventDefault();
      drawing = true;
      draw(event);
    };

    const stop = (event) => {
      event.preventDefault();
      drawing = false;
      context.beginPath();
      URL = canvasRef.current.toDataURL();
    //   dispatch(storeInputDAS(URL));
    };

    if (clear === true) {
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      context.beginPath();
      setClear(!clear);
    }

    canvasRef.current.onpointerdown = start;
    canvasRef.current.onpointerup = stop;
    canvasRef.current.onpointermove = draw;
  }, [clear]);

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <canvas id="canvas" ref={canvasRef} onChange={handleChange} />
      <button className="clearButton"
          onClick={() => {
            setClear(!clear);
          }}
        >
          Clear
        </button>
    </div>
  );
};

export default DrawField;
