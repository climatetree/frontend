export const doesConvertToYear = seconds => {
  return seconds > 31536000;
};

export const doesConvertToMonth = seconds => {
  return seconds > 2592000;
};

export const doesConvertToDay = seconds => {
  return seconds > 86400;
};

export const doesConvertToHour = seconds => {
  return seconds > 3600;
};

export const doesConvertToMinutes = seconds => {
  return seconds > 60;
};
