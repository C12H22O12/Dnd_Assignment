import React, { PropsWithChildren, ReactElement, ReactNode, cloneElement } from 'react';
import { GRID } from '@constant/index';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Direction, Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';
import { itemTypes } from '@type/index';

interface DroppableLayoutProps {
  type: 'order' | 'list';
  direction: Direction;
  items: itemTypes[];
  isCombineEnabled?: boolean;
  col: string;
  [key: string]: any;
}

function DroppableLayout({ type, items, direction, isCombineEnabled, col, ...rest }: DroppableLayoutProps) {
  console.log(col);
  return (
    <Droppable
      type={type}
      droppableId={`droppable_${type}_${col}`}
      direction={direction}
      isCombineEnabled={isCombineEnabled}
    >
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver, direction)}
        >
          {items.map((item, index) => {
            return (
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
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default DroppableLayout;

const getItemStyle = (isDragging: boolean, draggableStyle?: DraggingStyle | NotDraggingStyle) => ({
  userSelect: 'none',
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean, direction: Direction) => {
  const style = {
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: GRID,
    width: `calc(${100}vw - ${GRID * 2})`,
    BoxSizing: 'border-box',
  };

  return direction === 'horizontal' ? { ...style, display: 'flex' } : style;
};
