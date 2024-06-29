import React, { PropsWithChildren } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDnd } from '@store/context/dndContext';

interface ColumnProps extends PropsWithChildren {}

function Column({ children }: ColumnProps) {
  const { onDragEnd } = useDnd();
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}

export default Column;
