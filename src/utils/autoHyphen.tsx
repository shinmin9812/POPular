const autoHyphen = (phoneNumber: string) => {
  return phoneNumber
    .slice(0, 13)
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/(\-{1,2})$/g, '');
};

export default autoHyphen;
