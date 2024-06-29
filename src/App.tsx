import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DropResult,
} from 'react-beautiful-dnd';
import { itemTypes } from './type';

function App() {
  const getItems = (count: number): itemTypes[] =>
    Array.from({ length: count }, (_, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));

  const [items, setItems] = useState<itemTypes[]>(getItems(10));

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
    [items]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={
                      getItemStyle(snapshot.isDragging, provided.draggableProps.style) as DetailedHTMLProps<
                        HTMLAttributes<HTMLDivElement>,
                        HTMLDivElement
                      >
                    }
                  >
                    {item.content}
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

const GRID = 8;

const getItemStyle = (isDragging: boolean, draggableStyle?: DraggingStyle | NotDraggingStyle) => ({
  userSelect: 'none',
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: GRID,
  width: 250,
});

export default App;
