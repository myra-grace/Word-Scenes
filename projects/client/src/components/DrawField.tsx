import React, { useState, useRef, useEffect } from "react";
import Menu from "./Menu";

interface Props {
  handleChange: (event: React.FormEvent<HTMLCanvasElement>) => void;
}

const DrawField: React.FC<Props> = ({ handleChange }) => {
  // const [canvasData, setCanvasData] = useState<string | null | undefined>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const [clear, setClear] = useState<boolean | null | undefined>(false);
  const [toggle, setToggle] = useState<boolean | null | undefined>(false);

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

  const handleDone = (event) => {
    console.log('sent');
    setClear(!clear);
  }

  const handleToggle = () => {
    const container = settingsButtonRef.current;
    container.classList.toggle("change");
    setToggle(!toggle);
    console.log('toggle: ', toggle);
  }


  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      {!toggle ? null :
        <Menu />
      }
      <canvas id="canvas" ref={canvasRef} onChange={handleChange} />
      <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
        <button className="clearButton"
          onClick={() => {
            setClear(!clear);
          }}
        >
          Clear
        </button>
        <button ref={settingsButtonRef} className="settingsButton" onClick={handleToggle}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button>
        <button className="doneButton"
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default DrawField;
