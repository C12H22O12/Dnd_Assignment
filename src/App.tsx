import React from 'react';
import { DndProvider } from '@store/context/dndContext';
import './App.css';
import Table from './container';

function App() {
  return (
    <div className="container">
      <DndProvider itemCnt={4}>
        <Table />
      </DndProvider>
    </div>
  );
}

export default App;
