// components/Shape.jsx
import React from 'react';
/*
Creates the shape (rectangles and circles) by inputting coordinates and colors.
*/
const Shape = ({ element, isSelected, onClick, onMouseDown, onResizeStart, onRotateStart }) => {
  const transform = element.rotation ? `rotate(${element.rotation}, ${element.x + element.width/2}, ${element.y + element.height/2})` : '';
  
  const shapeProps = {
    onClick: (e) => onClick(e, element),
    onMouseDown: (e) => onMouseDown(e, element),
    style: { cursor: 'grab' }
  };

  const renderShape = () => {
    if (element.type === 'rect') {
      return (
        <rect
          x={element.x}
          y={element.y}
          width={element.width}
          height={element.height}
          fill={element.color}
          stroke={isSelected ? '#3b82f6' : 'none'}
          strokeWidth={isSelected ? 2 : 0}
          rx={4}
          {...shapeProps}
        />
      );
    }
    
    if (element.type === 'circle') {
      return (
        <circle
          cx={element.x + element.width/2}
          cy={element.y + element.height/2}
          r={element.width/2}
          fill={element.color}
          stroke={isSelected ? '#3b82f6' : 'none'}
          strokeWidth={isSelected ? 2 : 0}
          {...shapeProps}
        />
      );
    }
    
    return null;
  };

  return (
    <g transform={transform}>
      {renderShape()}
    </g>
  );
};

export default Shape;