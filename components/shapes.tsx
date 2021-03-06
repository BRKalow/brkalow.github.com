import React from 'react';
import { shape } from 'prop-types';
import ToggleSwitch from './toggle-switch';

const colors = ['#ed6f4d', '#facaa5', '#71c3ad', '#4ca9e0', '#54899c', '#62b3e3', '#c6dcda'];
const shapeNames = ['line', 'square', 'circle'];

const makeRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

let shapes = [];

const makeShapes = () => {
  shapes = [];
  for (let i = 0; i < 100; i++) {
    const shape = shapeNames[i % 3];
    shapes.push({
      x: makeRandomInt(2, 98),
      y: makeRandomInt(2, 98),
      translateX: makeRandomInt(0, 100),
      translateY: makeRandomInt(0, 100),
      width: makeRandomInt(shape === 'line' ? 10 : 5, shape === 'line' ? 15 : 8),
      rotate: makeRandomInt(0, 180),
      color: colors[makeRandomInt(0, colors.length - 1)],
      shape: shapeNames[i % 3],
      id: uuidv4()
    });
  }
};

const randomizeShapePosition = shape => ({
  ...shape,
  translateX: makeRandomInt(0, 100),
  translateY: makeRandomInt(0, 100)
});

makeShapes();

const shapeStyles = ({ x, y, width, shape, rotate, color, translateX = 0, translateY = 0 }) => ({
  position: 'absolute' as const,
  top: `${y}%`,
  left: `${x}%`,
  width: `${width}px`,
  height: `${shape === 'line' ? '2' : width}px`,
  opacity: 0.8 - y / 100,
  transform: `rotate(${rotate}deg) translate(${translateX}%, ${translateY}%)`,
  backgroundColor: shape === 'line' ? color : 'transparent',
  borderColor: color,
  border: shape === 'line' ? '' : `2px solid ${color}`,
  borderRadius: shape === 'circle' ? '50%' : 0,
  zIndex: -1,
  transition: 'all 3s cubic-bezier(0.445, 0.05, 0.55, 0.95)',
});

const Shapes = () => {
  const [curShapes, setShapes] = React.useState(shapes);
  const [isMoving, setIsMoving] = React.useState(true);
  const timeout = React.useRef<NodeJS.Timeout | undefined>();

  React.useEffect(() => {
    if (!isMoving) return;
    setShapes(curShapes.map(randomizeShapePosition));

    timeout.current = setInterval(() => setShapes(curShapes.map(randomizeShapePosition)), 2000);

    return () => clearInterval(timeout.current);
  }, [isMoving]);
  return (
    <>
      {curShapes.map((shape, i) => (
        <React.Fragment key={shape.id}>
          <div style={shapeStyles(shape)} key={shape.id} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Shapes;
