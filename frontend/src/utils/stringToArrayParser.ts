export const stringToArrayParser = <T = { [objectKey: string]: string }>(text: string, separator: string, objectKey: string): T[] => {
  const array = text.split(separator);
  const newArray: { [objectKey: string]: string }[] = [];
  array.forEach((el) => {
    newArray.push({ [objectKey]: el });
  });

  if (newArray.length === 1 && newArray[0][objectKey] === "") {
    return [] as T[];
  } else {
    return newArray as T[];
  }
};
