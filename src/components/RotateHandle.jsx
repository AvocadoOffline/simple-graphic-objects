// components/RotateHandle.jsx
import React from 'react';
import { getElementCenter } from '../utils/coordinates';

/*
This adds the dotted line and rotate control to rotate the selected shape.
*/
const RotateHandle = ({ element, onRotateStart }) => {
  const center = getElementCenter(element);
  const distanceFromTop = 35;
  const handleRadius = 10;

  return (
    <g>
      <line
        x1={center.x}
        y1={center.y}
        x2={center.x}
        y2={center.y - distanceFromTop}
        stroke="#3b82f6"
        strokeWidth={1.5}
        strokeDasharray="4"
      />
      <circle
        cx={center.x}
        cy={center.y - distanceFromTop}
        r={handleRadius}
        fill="#3b82f6"
        stroke="#ffffff"
        strokeWidth={2}
        style={{ cursor: 'grab' }}
        onMouseDown={onRotateStart}
      />
      <text
        x={center.x}
        y={center.y - distanceFromTop + 4}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        pointerEvents="none"
      >
        ↻
      </text>
    </g>
  );
};

export default RotateHandle;