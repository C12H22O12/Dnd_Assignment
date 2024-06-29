import { COLS, LISTS } from '@constant/index';
import type { dataTypes, itemTypes } from '@type/index';

export const getItems = (col: number): itemTypes[] =>
  Array.from({ length: LISTS }, (_, k) => k).map((k) => ({
    id: `${col}-item-${k}`,
    content: `item ${k}`,
  }));

export const getData = () => {
  let data: dataTypes = {};

  for (let i = 1; i <= COLS; i++) {
    data[i] = getItems(i);
  }
  
  return data;
};
