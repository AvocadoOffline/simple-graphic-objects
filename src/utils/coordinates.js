export const getCanvasCoords = (e, svgElement) => {
  const pt = svgElement.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const cursor = pt.matrixTransform(svgElement.getScreenCTM().inverse());
  return { x: cursor.x, y: cursor.y };
};

export const getElementCenter = (element) => {
  return {
    x: element.x + element.width / 2,
    y: element.y + element.height / 2
  };

};