// App.jsx
import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import PropertiesPanel from './components/PropertiesPanel';
import './App.css';
import {getRandomColor} from "./utils/colors"

function App() {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [tool, setTool] = useState('select');

  const updateElement = (id, updates) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const addElement = (type, x, y) => {
    const newElement = {
      id: Date.now().toString(),
      type: type,
      x: x - 50,
      y: y - 50,
      width: type === 'rect' ? 100 : 80,
      height: type === 'rect' ? 100 : 80,
      color: getRandomColor(),
    };
    setElements(prev => [...prev, newElement]);
    setSelectedId(newElement.id);
  };

  const deleteElement = (id) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="app">
      <Toolbar tool={tool} setTool={setTool}/>
      <div className="workspace">
        <Canvas 
          elements={elements}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          updateElement={updateElement}
          tool={tool}
          onCanvasClick={(x, y) => {
            if (tool === 'rect') addElement('rect', x, y);
            if (tool === 'circle') addElement('circle', x, y);
          }}
        />
        <PropertiesPanel 
          element={elements.find(el => el.id === selectedId)}
          onUpdate={updateElement}
          onDelete={deleteElement}
        />
      </div>
    </div>
  );
}

export default App;