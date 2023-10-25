import { useState, useEffect } from 'react';

const useStopWatch = () => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const stopWatch = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    return () => {
      clearInterval(stopWatch);
    };
  }, [time]);

  return time;
};

export default useStopWatch;
