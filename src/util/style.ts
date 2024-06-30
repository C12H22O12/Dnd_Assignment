import { GRID } from '@constant/index';
import { Direction, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle?: DraggingStyle | NotDraggingStyle,
  isInvaild?: boolean,
) => ({
  userSelect: 'none',
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  borderRadius: GRID,
  border: `solid 1.5px ${isDragging ? (isInvaild ? '#f9744b' : '#124d54') : '#e1d9cf'}`,
  color: '#102937',
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean, direction: Direction) => {
  const style = {
    background:  '#ffffff',
    borderRadius: GRID,
    width: `calc(${100}vw - ${GRID * 2})`,
    BoxSizing: 'border-box',
    color: '#102937',
  };

  return direction === 'horizontal' ? { ...style, display: 'flex', gap: GRID } : style;
};
