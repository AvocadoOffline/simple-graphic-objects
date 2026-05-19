// components/PropertiesPanel.jsx
import React from 'react';
import './PropertiesPanel.css';

const PropertiesPanel = ({ element, onUpdate, onDelete }) => {
  if (!element) {
    return (
      <div className="properties-panel">
        <h3>Properties</h3>
        <p className="no-selection">Select an element to edit</p>
      </div>
    );
  }

  return (
    <div className="properties-panel">
      <h3>Properties</h3>
      
      <div className="property-group">
        <label>Type</label>
        <span className="property-value">
          {element.type === 'rect' ? 'Rectangle' : 'Circle'}
        </span>
      </div>
      
      <div className="property-group">
        <label>Color</label>
        <input
          type="color"
          value={element.color}
          onChange={(e) => onUpdate(element.id, { color: e.target.value })}
          className="color-input"
        />
      </div>
      
      <div className="property-group">
        <label>X Position</label>
        <input
          type="number"
          value={Math.round(element.x)}
          onChange={(e) => onUpdate(element.id, { x: Math.max(0, parseInt(e.target.value) || 0) })}
          className="number-input"
        />
      </div>
      
      <div className="property-group">
        <label>Y Position</label>
        <input
          type="number"
          value={Math.round(element.y)}
          onChange={(e) => onUpdate(element.id, { y: Math.max(0, parseInt(e.target.value) || 0) })}
          className="number-input"
        />
      </div>
      
      <div className="property-group">
        <label>Width</label>
        <input
          type="number"
          value={Math.round(element.width)}
          onChange={(e) => onUpdate(element.id, { width: Math.max(20, parseInt(e.target.value) || 20) })}
          className="number-input"
        />
      </div>
      
      <div className="property-group">
        <label>Height</label>
        <input
          type="number"
          value={Math.round(element.height)}
          onChange={(e) => onUpdate(element.id, { height: Math.max(20, parseInt(e.target.value) || 20) })}
          className="number-input"
        />
      </div>
      <div className="property-group">
        <label>Rotation</label>
        <input
          type="range"
          value={element.rotation || 0}
          onChange={(e) => onUpdate(element.id, { rotation: parseInt(e.target.value) })}
          min="0"
          max="360"
          step="1"
          className="slider-input"
        />
        <span className="value-display">{element.rotation || 0}°</span>
      </div>
      <button onClick={() => onDelete(element.id)} className="delete-btn">
        Delete Element
      </button>
    </div>
  );
};

export default PropertiesPanel;