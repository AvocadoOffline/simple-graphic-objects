import { useState } from 'react';
import { getCanvasCoords } from '../utils/coordinates';
import { applyBounds } from '../utils/bounds';

/*
This calculates the coordinate of shapes before drag and the difference in coordinates to move the shape accordingly.
*/
export const useDrag = (element, updateElement, canvasRef) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, elementX: 0, elementY: 0 });

  const startDrag = (e) => {
    if (!element) return;
    const coords = getCanvasCoords(e, canvasRef.current);
    setDragStart({
      x: coords.x,
      y: coords.y,
      elementX: element.x,
      elementY: element.y
    });
    setIsDragging(true);
  };

  const onDrag = (e) => {
    if (!isDragging || !element) return;
    const coords = getCanvasCoords(e, canvasRef.current);
    const dx = coords.x - dragStart.x;
    const dy = coords.y - dragStart.y;
    
    const newX = Math.max(0, Math.min(800 - element.width, dragStart.elementX + dx));
    const newY = Math.max(0, Math.min(600 - element.height, dragStart.elementY + dy));
    
    updateElement(element.id, { x: newX, y: newY });
  };

  const stopDrag = () => setIsDragging(false);

  return { isDragging, startDrag, onDrag, stopDrag };
};