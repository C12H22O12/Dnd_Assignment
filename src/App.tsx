import React from 'react';
import { useCallback, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { dataTypes } from './type';
import { getData } from './util';
import DroppableLayout from '@layout/Droppable1';
import { reorder } from '@util/order';

function App() {
  const data = getData();
  const [list, setLists] = useState<dataTypes>(data);
  const [orders, setOrders] = useState<string[]>(Object.keys(data));

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { type, destination, source } = result;
      console.log(source, destination);

      if (!destination) {
        return;
      }

      const { index: startIndex, droppableId: startId } = source;
      const { index: endIndex, droppableId: endId } = destination;

      if (startIndex === endIndex && startId === endId) {
        return;
      }

      switch (type) {
        case 'order':
          const reordered = reorder(orders, startIndex, endIndex);
          setOrders(reordered);
          return;
        case 'list':
          const cols = Number(startId.split('_').at(-1));
          setLists((prev) => {
            let tmp = { ...prev };
            tmp[cols] = reorder(list[cols], startIndex, endIndex);
            console.log(prev);
            return tmp;
          });
          return;
      }
    },
    [orders, list],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableLayout type={'order'} direction={'horizontal'} items={orders} isCombineEnabled={true} list={list} />
    </DragDropContext>
  );
}

export default App;
