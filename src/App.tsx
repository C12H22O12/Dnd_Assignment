import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import { DragDropContext, DragUpdate, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { dataTypes } from './type';
import { getData } from './util/data';
import { reorder } from '@util/order';
import { getItemStyle, getListStyle } from '@util/style';
import Column from '@component/Column';

function App() {
  const data = getData();
  const [list, setLists] = useState<dataTypes>(data); // key값으로 column의 값을 가지고, value로 각 리스트 아이템을 가지는 state
  const [orders, setOrders] = useState<string[]>(Object.keys(data)); // column의 값을 가지는 state
  const [invaild, setInvaild] = useState<string>('');

  const onDragUpdate = useCallback((update: DragUpdate) => {
    setInvaild('null');
    const { draggableId: startId, destination, type } = update;

    if (!destination || type === 'list') {
      return;
    }

    const startIndex = Number(startId.split('_').at(-1));
    const endIndex = destination.index;

    if ((startIndex === 0 && endIndex === 2) || (startIndex % 2 === 1 && (endIndex + 1) % 2 === 1)) {
      setInvaild(startId);
      return;
    }
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { type, destination, source, reason } = result;

      if (!destination || reason === 'CANCEL') {
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
            return tmp;
          });
          return;
      }
    },
    [orders, list],
  );

  return (
    <DragDropContext onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
      <Droppable type={'order'} droppableId={`droppable_order`} direction={'horizontal'} isCombineEnabled={true}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver, 'horizontal')}
          >
            {orders.map((item, index) => (
              <Draggable key={`order_${index}`} draggableId={`order_${index}`} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={
                      getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        invaild === `order_${index}`,
                      ) as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
                    }
                  >
                    <Column item={item} items={list[index + 1]} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
