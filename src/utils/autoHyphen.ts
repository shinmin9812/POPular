const autoHyphen = (value: string) => {
  let formattedValue = value.replace(/-/g, ''); // 기존에 입력된 하이픈 제거

  if (formattedValue.length > 3 && formattedValue.length <= 7) {
    formattedValue = formattedValue.replace(/(\d{3})(\d{1,4})/, '$1-$2'); // 첫 번째 하이픈 추가
  } else if (formattedValue.length > 7) {
    formattedValue = formattedValue.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3'); // 두 번째 하이픈 추가
  }

  return formattedValue;
};

export default autoHyphen;
