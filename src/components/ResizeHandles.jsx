// components/ResizeHandles.jsx
import React from 'react';

const ResizeHandles = ({ element, onResizeStart }) => {
  const handleSize = 8;
  const handles = [
    { name: 'nw', x: element.x - handleSize/2, y: element.y - handleSize/2, cursor: 'nw-resize' },
    { name: 'n', x: element.x + element.width/2 - handleSize/2, y: element.y - handleSize/2, cursor: 'n-resize' },
    { name: 'ne', x: element.x + element.width - handleSize/2, y: element.y - handleSize/2, cursor: 'ne-resize' },
    { name: 'w', x: element.x - handleSize/2, y: element.y + element.height/2 - handleSize/2, cursor: 'w-resize' },
    { name: 'e', x: element.x + element.width - handleSize/2, y: element.y + element.height/2 - handleSize/2, cursor: 'e-resize' },
    { name: 'sw', x: element.x - handleSize/2, y: element.y + element.height - handleSize/2, cursor: 'sw-resize' },
    { name: 's', x: element.x + element.width/2 - handleSize/2, y: element.y + element.height - handleSize/2, cursor: 's-resize' },
    { name: 'se', x: element.x + element.width - handleSize/2, y: element.y + element.height - handleSize/2, cursor: 'se-resize' },
  ];

  return (
    <>
      {handles.map(handle => (
        <rect
          key={handle.name}
          x={handle.x}
          y={handle.y}
          width={handleSize}
          height={handleSize}
          fill="#3b82f6"
          stroke="#ffffff"
          strokeWidth={1.5}
          style={{ cursor: handle.cursor }}
          onMouseDown={(e) => onResizeStart(e, handle.name)}
        />
      ))}
    </>
  );
};

export default ResizeHandles;