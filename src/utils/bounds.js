/*
This ensures the shape cannot be moved outside the canvas and has a minimum width and height of 20. (Prevent vanishing due to extremely small size)
*/

export const applyBounds = (element, updates) => {
  let newUpdates = { ...updates };
  
  // Minimum size
  if (newUpdates.width && newUpdates.width < 20) newUpdates.width = 20;
  if (newUpdates.height && newUpdates.height < 20) newUpdates.height = 20;
  
  // Position bounds
  if (newUpdates.x && newUpdates.x < 0) newUpdates.x = 0;
  if (newUpdates.y && newUpdates.y < 0) newUpdates.y = 0;
  
  // Canvas bounds (800x600)
  const finalWidth = newUpdates.width || element.width;
  const finalHeight = newUpdates.height || element.height;
  const finalX = newUpdates.x !== undefined ? newUpdates.x : element.x;
  const finalY = newUpdates.y !== undefined ? newUpdates.y : element.y;
  if (finalX + finalWidth > 800) {
    newUpdates.x = 800 - finalWidth;
  }
  if (finalY + finalHeight > 600) {
    newUpdates.y = 600 - finalHeight;
  }
  
  return newUpdates;
};