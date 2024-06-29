import React from 'react';
import Modules from '@component/modules';
import Column from '@layout/column';
import { DndProvider, useDnd } from '@store/context/dndContext';
import Atom from '@component/atom';

function Table() {
  const { items } = useDnd();

  return (
    <Column>
      {items.map(() => (
        <Column>
          <DndProvider itemCnt={10}>
            <Modules>
              <Atom item={{ id: '', content: '' }} index={0} />
            </Modules>
          </DndProvider>
        </Column>
      ))}
    </Column>
  );
}

export default Table;
