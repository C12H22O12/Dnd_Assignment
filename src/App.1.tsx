import React from 'react';
import { useCallback, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { dataTypes } from './type';
import { getData } from './util';
import DroppableLayout from '@layout/Droppable';

export function App() {
  const data = getData();
  const [list, setLists] = useState<dataTypes>(data);
  const [orders, setOrders] = useState<string[]>(Object.keys(data));

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { type } = result;

      console.log(type);

      // if (!result.destination) {
      //   return;
      // }
      const newItems = reorder(columns, result.source.index, result.destination.index);

      setColumns(newItems);
    },
    [orders, list],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableLayout type={'order'} direction={'horizontal'} items={orders} />
    </DragDropContext>
  );
}
