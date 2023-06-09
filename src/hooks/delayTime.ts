// import {useState, useEffect} from 'react';

// // 倒计时 Hook
// export default function useCountdown(initialTime: number):[number, () => void] {
//     const [time, setTime] = useState(initialTime);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTime((prevTime) => prevTime - 1);
//         }, 1000);

//         if (time === 0) {
//             console.log(time)
//             clearInterval(timer);
//         }

//         return () => clearInterval(timer);
//     }, [time]);

//     const reset = () => {
//         setTime(initialTime);
//     };

//     return [time, reset];
// }

import { useState, useEffect } from 'react';

// 倒计时 Hook
export default function useCountdown(initialTime: number): [number, () => void] {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const reset = () => {
    setTime(initialTime);
  };

  return [time, reset];
}