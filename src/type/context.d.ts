import { PropsWithChildren, Dispatch, SetStateAction } from 'react';
import { itemTypes } from '.';
import { DropResult } from 'react-beautiful-dnd';

export interface DndProviderParam extends PropsWithChildren {
  itemCnt: number;
}

export interface DndContextValues {
  items: itemTypes[];
  setItems: Dispatch<SetStateAction<itemTypes[]>>;
  onDragEnd: (result: DropResult) => void;
}
