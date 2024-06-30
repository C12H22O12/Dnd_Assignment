import { GRID } from "@constant/index";
import { Direction, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle?: DraggingStyle | NotDraggingStyle,
  isInvaild?: boolean,
) => ({
  userSelect: 'none',
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? (isInvaild ? 'red' : 'lightgreen') : 'grey',
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean, direction: Direction) => {
  const style = {
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: GRID,
    width: `calc(${100}vw - ${GRID * 2})`,
    BoxSizing: 'border-box',
  };

  return direction === 'horizontal' ? { ...style, display: 'flex' } : style;
};
