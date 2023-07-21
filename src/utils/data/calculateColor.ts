export const calculateColor = (
  value: number,
  min: number,
  max: number,
  hue = 10,
  margin = 0.25
) => {
  const range = max - min;
  const rangeWithMargin = max * (1 + margin) - min * (1 + margin);
  const marginValue = rangeWithMargin - range;
  const distanceToValue = value - min;
  const percent =
    100 - ((distanceToValue + marginValue / 2) / rangeWithMargin) * 100;
  return `hsla(${hue}, 100%, ${percent}%, 1)`;
};
