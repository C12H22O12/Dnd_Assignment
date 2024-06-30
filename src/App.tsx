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

      if (!destination) {
        return;
      }

      const { index: startIndex, droppableId: startId } = source;
      const { index: endIndex, droppableId: endId } = destination;

      if (startIndex === endIndex && startId === endId) {
        return;
      }

      // 제약 조건 반영
      // 1 - 첫 번째 칼럼에서 세 번째 칼럼으로는 아이템 이동이 불가능해야 합니다.
      // 2 - 짝수 아이템은 다른 짝수 아이템 앞으로 이동할 수 없습니다.
      if ((startIndex === 0 && endIndex === 2) || (startIndex % 2 && !(endIndex % 2))) {
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
