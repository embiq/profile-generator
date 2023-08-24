export const arrayToStringParser = (array: any[], separator: string) => {
  return typeof array[0] === "string"
    ? array.join(separator)
    : array
        .map((el) => {
          switch (typeof el) {
            case "string":
              return el;
            default:
              return el[Object.keys(el)[0]];
          }
        })
        .join(separator);
};
