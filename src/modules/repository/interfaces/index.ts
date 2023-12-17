export type RequestedFieldsMap<T> = {
  [K in keyof T]: boolean;
};
