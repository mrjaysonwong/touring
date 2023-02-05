export const formatNum = (number) => {
  const phoneNumber = number.replace(/[^0-9]/g, '');
  return phoneNumber;
};

export const formatPatternNum = (number) => {
  const pattern = /[0-9]/;
  const input = String.fromCharCode(number.charCode);
  if (!pattern.test(input)) {
    number.preventDefault();
  }

  return;
};
