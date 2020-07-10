import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Menu from "./Menu";
import { illustrationAdded, submit } from '../actions';


interface Props {
  handleChange: (event: React.FormEvent<HTMLCanvasElement>) => void;
}

const DrawField: React.FC<Props> = ({ handleChange }) => {
  // const [canvasData, setCanvasData] = useState<string | null | undefined>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const [clear, setClear] = useState<boolean | null | undefined>(false);
  const [toggle, setToggle] = useState<boolean | null | undefined>(false);
  const [url, setUrl] = useState<string | null | undefined>();
  const dispatch = useDispatch();

  const illustrations = useSelector(state => state.generalReducer.illustrations);
  const submitted = useSelector(state => state.generalReducer.submitions);

  let CANVAS_SIZE = [];
  let windowW = window.innerWidth - 50;
  let windowH = window.innerHeight - 200;
  if (windowW > windowH) {
    CANVAS_SIZE = [windowH, windowH];
  } else {
    CANVAS_SIZE = [windowW, windowW];
  }
  

  let drawing:boolean = false;

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');

        const draw = (event) => {
            if (!drawing) return;
            context.lineWidth = 5;
            context.lineCap = "round";
            context.strokeStyle = '#D6EAFF';
            context.shadowColor = 'dodgerblue';
            context.shadowBlur = 20;
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
            context.beginPath();
            context.moveTo(event.offsetX, event.offsetY);
            context.imageSmoothingQuality = "high";
        }

        const start = (event) => {
            event.preventDefault();
            drawing = true;
        }

        const stop = (event) => {
            event.preventDefault();
            drawing = false;
            context.beginPath();
            setUrl(canvasRef.current.toDataURL());
        }

        if (clear === true) {
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.beginPath();
            setClear(!clear);
        }

        canvasRef.current.onpointerdown = start;
        canvasRef.current.onpointermove = draw;
        canvasRef.current.onpointerup = stop;

        canvasRef.current.ontouchstart = start;
        canvasRef.current.ontouchmove = draw;
        canvasRef.current.ontouchend = stop;
  }, [clear]);

  const handleDone = (event) => {
    event.preventDefault();
    dispatch(illustrationAdded(url))
    dispatch(submit(submitted +1))
    setClear(!clear);
  }

  const handleToggle = () => {
    const container = settingsButtonRef.current;
    container.classList.toggle("change");
    setToggle(!toggle);
  }


  return (
    <div id="canvaswrapper" style={{width: "auto", height: "auto", display: "flex", flexDirection: "column"}}>
      {!toggle ? null :
        <Menu />
      }
      <canvas id="canvas" ref={canvasRef} onChange={handleChange}
      width={`${CANVAS_SIZE[0]}px`}
      height={`${CANVAS_SIZE[1]}px`}/>
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
