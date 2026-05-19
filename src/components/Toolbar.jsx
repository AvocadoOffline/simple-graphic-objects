import React from 'react';
import './Toolbar.css';

/* 
This provides the user a toolbar to switch between selecting and adding shapes.
*/

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
    </div>
  );
};

export default Toolbar;