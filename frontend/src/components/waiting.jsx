import React from 'react';
// import { animated, useSpring } from '@react-spring/web'
import ChromeDinoGame from 'react-chrome-dino';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const updateMousePosition = event => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
}

const Waiting = () => {
  const { x, y } = useMousePosition();
  console.log(x, y);
  // const spring = useSpring({
  //   from: { rotate: 0 },
  //   to: [
  //     { rotate: 60 },
  //     { rotate: 120 },
  //     { rotate: 180 },
  //     { rotate: 240 },
  //   ],
  //   loop: true
  // })

  // const focus = useSpring

  return (
    <>
      <div
        style={{
          background: '#CCCCFF',
          // x: x,
          // y: y,
          width: '30%',
          // height: '50px',
          // margin: 0,
          textAlign: 'center',
          borderRadius: '25px',
          transformOrigin: 'bottom right',
          transform: `translate(${x}px, ${y}px)`,
          // ...spring
        }}
      >
        Please wait for the host to start...
      </div>
      <ChromeDinoGame></ChromeDinoGame>
    </>
  );
}

export default Waiting;
