import type { itemTypes } from '@type/index';

export const getItems = (count: number): itemTypes[] =>
  Array.from({ length: count }, (_, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));
