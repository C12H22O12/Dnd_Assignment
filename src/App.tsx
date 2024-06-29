import React from 'react';
import { useCallback, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { itemTypes } from './type';
import { getItems } from './util';
import DroppableLayout from '@layout/Droppable';

function App() {
  const [columns, setColumns] = useState<itemTypes[]>(getItems(4));

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

      const newItems = reorder(columns, result.source.index, result.destination.index);

      setColumns(newItems);
    },
    [columns],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableLayout direction={'horizontal'} items={columns} />
    </DragDropContext>
  );
}

export default App;
