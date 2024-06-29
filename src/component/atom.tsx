import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { GRID } from '@constant/index';
import type { itemTypes } from '@type/index';
import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

export interface AtomProps {
  item: itemTypes;
  index: number;
}

function Atom({ item, index }: AtomProps) {
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
}

export default Atom;

const getItemStyle = (isDragging: boolean, draggableStyle?: DraggingStyle | NotDraggingStyle) => ({
  userSelect: 'none',
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});
