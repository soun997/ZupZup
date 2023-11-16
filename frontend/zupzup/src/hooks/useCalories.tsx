import { store } from './store/useStore';

const calculateCalories = (stopwatch: number, distance: number): number => {
  const weightInKg = Number(
    store.getState().auth.weight ? store.getState().auth.weight : 60,
  );

  const time = stopwatch / 3600; // hour
  //console.log('time', time, stopwatch);

  const speed = distance / (1000 * time); //시속
  //시속 9km 당 6 METs -> 1km : 2/3 Mets
  const oneMet = (2 * speed * time) / 3;

  const calories = 1.05 * oneMet * weightInKg;

  //console.log(oneMet, calories);

  return calories;
};

export default calculateCalories;
