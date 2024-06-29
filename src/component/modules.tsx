import React, { PropsWithChildren, ReactElement, cloneElement } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { GRID } from '@constant/index';
import { useDnd } from '@store/context/dndContext';
import { AtomProps } from './atom';

interface ModulesProps extends PropsWithChildren {
  children: ReactElement<AtomProps>;
}

function Modules({ children }: ModulesProps) {
  const { items } = useDnd();

  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
          {items.map((item, index) => cloneElement(children, { item: item, index: index }))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Modules;

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: GRID,
  width: 250,
});
