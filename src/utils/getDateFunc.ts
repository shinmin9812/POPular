const getDateFunc = (targetDate: string) => {
  const date = new Date(targetDate);
  const datePlusHour = new Date(date.setHours(date.getHours() + 9));

  const year = datePlusHour.getFullYear();
  const month = ('0' + (1 + datePlusHour.getMonth())).slice(-2);
  const day = ('0' + datePlusHour.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
};

export default getDateFunc;
