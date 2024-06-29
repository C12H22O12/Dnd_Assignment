import React, { FunctionComponent, createContext, useCallback, useContext, useState } from 'react';
import { getItems } from '@util/index';
import { DropResult } from 'react-beautiful-dnd';
import type { itemTypes } from '@type/index';
import { DndContextValues, type DndProviderParam } from '@type/context';

export const DndContext = createContext<DndContextValues | {}>({});

export const DndProvider: FunctionComponent<DndProviderParam> = ({ children, itemCnt }) => {
  const [items, setItems] = useState<itemTypes[]>(getItems(itemCnt));

  const reorder = (list: itemTypes[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const newItems = reorder(items, result.source.index, result.destination.index);

      setItems(newItems);
    },
    [items],
  );

  return <DndContext.Provider value={{ items, setItems, onDragEnd }}>{children}</DndContext.Provider>;
};

export const useDnd = (): DndContextValues => {
  return useContext(DndContext) as DndContextValues;
};
