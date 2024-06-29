import React from 'react';
import { GRID } from '@constant/index';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Direction, Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';

interface DroppableLayoutProps {
  type: 'order' | 'list';
  direction: Direction;
  items: any[];
}

function DroppableLayout({ type, items, direction }: DroppableLayoutProps) {
  return (
    <Droppable type={type} droppableId={`droppable_${direction}`} direction={direction}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver, direction)}
        >
          {items.map((item, index) => (
            <Draggable key={index} draggableId={`${index}`} index={index}>
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
                  {item}
                </div>
              )}
            </Draggable>
          ))}
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
