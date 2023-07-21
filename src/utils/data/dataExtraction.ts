export const extractNumericData = (data: any[][]) => {
  const numericData = data
    .flat()
    .filter((value) => typeof value === "number") as number[];

  const min = Math.min(...numericData);
  const max = Math.max(...numericData);

  return { min, max, numericData };
};
