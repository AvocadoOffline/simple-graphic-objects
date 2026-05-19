// components/Canvas.jsx
import React, { useRef, useEffect } from 'react';
import Shape from './Shape';
import ResizeHandles from './ResizeHandles';
import RotateHandle from './RotateHandle';
import { useDrag } from '../hooks/useDrag';
import { useResize } from '../hooks/useResize';
import { useRotate } from '../hooks/useRotate';
import { getCanvasCoords } from '../utils/coordinates';
import './Canvas.css';

const Canvas = ({ elements, selectedId, setSelectedId, updateElement, tool, onCanvasClick }) => {
  const canvasRef = useRef(null);
  const selectedElement = elements.find(el => el.id === selectedId);
  
  // Custom hooks
  const { isDragging, startDrag, onDrag, stopDrag } = useDrag(selectedElement, updateElement, canvasRef);
  const { resizeHandle, startResize, onResize, stopResize } = useResize(selectedElement, updateElement, canvasRef);
  const { isRotating, startRotate, onRotate, stopRotate } = useRotate(selectedElement, updateElement, canvasRef);

  const handleShapeClick = (e, element) => {
    e.stopPropagation();
    if (tool === 'select') setSelectedId(element.id);
  };

  const handleShapeMouseDown = (e, element) => {
    e.stopPropagation();
    if (tool !== 'select') return;
    setSelectedId(element.id);
    startDrag(e);
  };

  const handleCanvasClick = (e) => {
    if (tool !== 'select') {
      const coords = getCanvasCoords(e, canvasRef.current);
      onCanvasClick(coords.x, coords.y);
    } else {
      setSelectedId(null);
    }
  };

  // Global mouse move handler
  const handleMouseMove = (e) => {
    if (isDragging) onDrag(e);
    if (resizeHandle) onResize(e);
    if (isRotating) onRotate(e);
  };

  const handleMouseUp = () => {
    stopDrag();
    stopResize();
    stopRotate();
  };

  useEffect(() => {
    if (isDragging || resizeHandle || isRotating) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, resizeHandle, isRotating]);

  const getCursor = () => {
    if (tool !== 'select') return 'crosshair';
    if (resizeHandle) return `${resizeHandle}-resize`;
    if (isDragging || isRotating) return 'grabbing';
    return 'grab';
  };

  return (
    <svg
      ref={canvasRef}
      width="800"
      height="600"
      className="canvas"
      style={{ cursor: getCursor() }}
      onClick={handleCanvasClick}
    >
      {elements.map(element => {
        const isSelected = element.id === selectedId;
        
        return (
          <g key={element.id}>
            <Shape
              element={element}
              isSelected={isSelected}
              onClick={handleShapeClick}
              onMouseDown={handleShapeMouseDown}
            />
            {isSelected && tool === 'select' && (
              <>
                <ResizeHandles element={element} onResizeStart={startResize} />
                <RotateHandle element={element} onRotateStart={startRotate} />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default Canvas;