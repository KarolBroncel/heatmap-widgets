export type DataSourceButtonProps<T extends string> = {
  value: T;
  onClick: (value: T) => void;
  isActive?: boolean;
};
