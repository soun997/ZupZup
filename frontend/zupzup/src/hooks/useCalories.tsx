import { store } from './store/useStore';

const calculateCalories = (stopwatch: number): number => {
  //   const isMale = store.getState().auth.gender === 'M';
  //   const heightInCm = Number(store.getState().auth.height);
  //   const age =
  //     new Date().getFullYear() - Number(store.getState().auth.birthYear);
  const weightInKg = Number(store.getState().auth.weight);
  // const genderModifier = isMale ? 5 : -161;

  const time = stopwatch / 60;
  console.log('time', time, stopwatch);

  const oneMet = 10 * (3.5 * weightInKg * time);
  const calories = (oneMet / 1000) * 5;

  console.log(oneMet, calories);

  // // 기초 대사량 계산 (일일 기본 칼로리 소모량)
  // const basalMetabolicRate =
  //   10 * weightInKg + 6.25 * heightInCm - 5 * age + genderModifier;

  // // 활동 레벨에 따른 추가 칼로리 계산
  // const activityLevel = 1.2;
  // const totalCalories = basalMetabolicRate * activityLevel;

  return calories;
};

export default calculateCalories;
