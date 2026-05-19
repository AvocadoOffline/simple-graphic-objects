// hooks/useResize.js
import { useState } from 'react';
import { getCanvasCoords } from '../utils/coordinates';
import { applyBounds } from '../utils/bounds';

/*
This implements the function of the 8 resizing squares on 8 respective directions for scaling.
*/
export const useResize = (element, updateElement, canvasRef) => {
  const [resizeHandle, setResizeHandle] = useState(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, startRect: null });

  const startResize = (e, handle) => {
    if (!element) return;
    const coords = getCanvasCoords(e, canvasRef.current);
    setResizeHandle(handle);
    setResizeStart({
      x: coords.x,
      y: coords.y,
      startRect: { ...element }
    });
  };

  const onResize = (e) => {
    if (!resizeHandle || !element) return;
    const coords = getCanvasCoords(e, canvasRef.current);
    const deltaX = coords.x - resizeStart.x;
    const deltaY = coords.y - resizeStart.y;
    const { startRect } = resizeStart;
    
    let updates = {};
    
    switch(resizeHandle) {
      case 'nw':
        updates = { x: startRect.x + deltaX, y: startRect.y + deltaY, width: startRect.width - deltaX, height: startRect.height - deltaY };
        break;
      case 'n':
        updates = { y: startRect.y + deltaY, height: startRect.height - deltaY };
        break;
      case 'ne':
        updates = { y: startRect.y + deltaY, width: startRect.width + deltaX, height: startRect.height - deltaY };
        break;
      case 'w':
        updates = { x: startRect.x + deltaX, width: startRect.width - deltaX };
        break;
      case 'e':
        updates = { width: startRect.width + deltaX };
        break;
      case 'sw':
        updates = { x: startRect.x + deltaX, width: startRect.width - deltaX, height: startRect.height + deltaY };
        break;
      case 's':
        updates = { height: startRect.height + deltaY };
        break;
      case 'se':
        updates = { width: startRect.width + deltaX, height: startRect.height + deltaY };
        break;
      default:
        break;
    }
    
    updates = applyBounds(element, updates);
    updateElement(element.id, updates);
  };

  const stopResize = () => setResizeHandle(null);

  return { resizeHandle, startResize, onResize, stopResize };
};