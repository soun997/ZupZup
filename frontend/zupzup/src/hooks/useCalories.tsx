import { store } from './store/useStore';

const calculateCalories = (stopwatch: number): number => {
  const weightInKg = Number(store.getState().auth.weight);

  const time = stopwatch / 60;
  console.log('time', time, stopwatch);

  const oneMet = 10 * (3.5 * weightInKg * time);
  const calories = (oneMet / 200) * 5;

  console.log(oneMet, calories);

  return calories;
};

export default calculateCalories;
