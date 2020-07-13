import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { illustrationAdded, submit } from '../actions';


interface Props {
  word: string;
  clear: boolean;
  done: boolean;
  urlGuess: object;
}

const DrawField: React.FC<Props> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const [clear, setClear] = useState<boolean | null | undefined>(false);
  const [done, setDone] = useState<boolean | null | undefined>(false);
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
    setClear(!clear);
  }, [props.clear])

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

  useEffect(() => {
    if (props.done === false) return
    dispatch(illustrationAdded({[props.word]: url}));
    dispatch(submit(submitted +1));
    setClear(!clear);
  }, [props.done])

  useEffect(() => {
    let urlString = Object.values(props.urlGuess);
    const context = canvasRef.current.getContext("2d");
    let img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0);
    };
    img.src = urlString.toString();
  }, [props.urlGuess]);

  return (
    <div id="canvaswrapper" style={{width: "auto", height: "auto", display: "flex", flexDirection: "column"}}>
      <canvas id="canvas" ref={canvasRef}
      width={`${CANVAS_SIZE[0]}px`}
      height={`${CANVAS_SIZE[1]}px`}/>
    </div>
  );
};

export default DrawField;
