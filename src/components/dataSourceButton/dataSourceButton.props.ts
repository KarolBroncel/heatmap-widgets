export type DataSourceButtonProps<T extends string> = {
  value: T;
  activeValue: string;
  onClick: (value: T) => void;
};
