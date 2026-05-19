import { useState } from 'react';
import { getCanvasCoords, getElementCenter } from '../utils/coordinates';

/*
This calculates the angle for the shape to be rotated using arctan and difference in x, y-coordinates.
*/
export const useRotate = (element, updateElement, canvasRef) => {
  const [isRotating, setIsRotating] = useState(false);
  const [rotationStart, setRotationStart] = useState({ angle: 0, startAngle: 0 });

  const startRotate = (e) => {
    if (!element) return;
    const center = getElementCenter(element);
    const coords = getCanvasCoords(e, canvasRef.current);
    const startAngle = Math.atan2(coords.y - center.y, coords.x - center.x) * 180 / Math.PI;
    setRotationStart({
      angle: element.rotation || 0,
      startAngle: startAngle
    });
    setIsRotating(true);
  };

  const onRotate = (e) => {
    if (!isRotating || !element) return;
    const center = getElementCenter(element);
    const coords = getCanvasCoords(e, canvasRef.current);
    const currentAngle = Math.atan2(coords.y - center.y, coords.x - center.x) * 180 / Math.PI;
    let newRotation = rotationStart.angle + (currentAngle - rotationStart.startAngle);
    newRotation = ((newRotation % 360) + 360) % 360;
    updateElement(element.id, { rotation: newRotation });
  };

  const stopRotate = () => setIsRotating(false);

  return { isRotating, startRotate, onRotate, stopRotate };
};