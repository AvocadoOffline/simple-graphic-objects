import React from 'react';
import './Toolbar.css';

const Toolbar = ({ tool, setTool }) => {
  return (
    <div className="toolbar">
      <button
        onClick={() => setTool('select')}
        className={tool === 'select' ? 'active' : ''}
      >
        Select
      </button>
      <button
        onClick={() => setTool('rect')}
        className={tool === 'rect' ? 'active' : ''}
      >
        Rectangle
      </button>
      <button
        onClick={() => setTool('circle')}
        className={tool === 'circle' ? 'active' : ''}
      >
        Circle
      </button>
      <div className="divider"></div>
    </div>
  );
};

export default Toolbar;