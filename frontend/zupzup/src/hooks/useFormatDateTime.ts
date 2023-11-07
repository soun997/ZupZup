const formatDateTimeHour = (localDateTime: string): string => {
  const splitedDatetime = localDateTime.split('T');
  const date = splitedDatetime[0];
  const time = splitedDatetime[1];
  const timeToHour = time.substring(0, 5);

  return `${date} ${timeToHour}`;
};

const formatDateTimePeriod = (
  startDateTime: string,
  endDateTime: string,
): string => {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  const timeDifference = (end.getTime() - start.getTime()) / 1000;
  const seconds = timeDifference % 60;
  const minutes = (timeDifference / 60) % 60;
  const hours = timeDifference / 3600;

  let result = '';
  if (hours > 0) {
    result += `${hours}시간`;
  }
  if (minutes > 0) {
    result += ` ${minutes}분`;
  }
  if (seconds > 0) {
    result += ` ${seconds}초`;
  }
  return result;
};

const useFormatDateTime = {
  formatDateTimeHour,
  formatDateTimePeriod,
};

export default useFormatDateTime;
