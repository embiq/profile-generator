export const calculateDurationTime = (numberOfMonths: number): string => {
  if (numberOfMonths === 1) {
    return "1 month";
  } else if (numberOfMonths < 12) {
    return `${numberOfMonths % 12} months`;
  } else if (numberOfMonths === 12) {
    return "1 year";
  } else if (numberOfMonths % 12 === 0) {
    return `${numberOfMonths / 12} years`;
  }
  const floor = Math.floor(numberOfMonths / 12);
  return `${floor === 1 ? `1 year` : `${floor} years`} ${numberOfMonths % 12 === 1 ? `1 month` : `${numberOfMonths % 12} months`}`;
};
