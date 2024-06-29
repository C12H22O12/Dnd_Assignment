import React from 'react';
import DroppableLayout from '@layout/Droppable2';
import { PropsWithChildren } from 'react';
import { dataTypes, itemTypes } from '@type/index';

interface ColumnProps extends PropsWithChildren {
  items: itemTypes[];
  item: string;
}

function Column({ items, item }: ColumnProps) {
  console.log(item);
  return (
    <>
      Column {item}
      <DroppableLayout type={'list'} direction={'vertical'} items={items} isCombineEnabled={true} col={item} />
    </>
  );
}

export default Column;
