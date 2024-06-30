import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PropsWithChildren } from 'react';
import { itemTypes } from '@type/index';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getItemStyle, getListStyle } from '@util/style';
import { GRID } from '@constant/index';

interface ColumnProps extends PropsWithChildren {
  items: itemTypes[];
  item: string;
}

function Column({ items, item }: ColumnProps) {
  return (
    <>
      <div style={{ width: 100, marginBottom: GRID, color: '#e1d9cf', textAlign: 'center', fontWeight: 'bolder' }}>
        Column {item}
      </div>
      <Droppable type={'list'} droppableId={`droppable_list_${item}`} direction={'vertical'} isCombineEnabled={true}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver, 'vertical')}
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
    </>
  );
}

export default Column;
