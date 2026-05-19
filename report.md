# Micro Design Tool — Object Manipulation with React + SVG

## Problem Statement

Build a lightweight browser-based design interface where users can perform simple object modifications (move, resize, recolor, rotate) on on-screen graphic elements. The tool should feel responsive, provide clear feedback, and demonstrate practical React state management for editor-like behavior — without over-scoping into full design tool complexity.

The core challenge: manage multiple selectable objects with independent transform properties (position, size, color, rotation) while keeping UI updates snappy and modifications intuitive.

## Methodology

### Tech Stack
- **React** (functional components + hooks)
- **SVG** for vector-based graphic elements
- **Vanilla CSS** for layout and control panels

### AI Tools Used
- **Deepseek** — CSS Details and canvas coordinates

### Implementation Approach

**Object Types & Modifications Supported**

| Object Type | Move | Resize | Recolor | Rotate |
|-------------|------|--------|---------|--------|
| Rectangle   | ✅   | ✅    | ✅      | ✅     |
| Circle      | ✅   | ✅    | ✅      | ✅ (visually unchanged) |

**Interaction Design**
- **Selection:** Click any object → control panel shows current properties
- **Move:** Drag the object directly
- **Resize:** Drag corners or input length/width/radius (minimum 20)
- **Recolor:** Native color picker or hex input
- **Rotate:** Slider (0–360°) or rotate with the rotate control

**State Management**
- All elements kept in `elements` state
- Each modification dispatches to immutable update of the object’s properties
- SVG `transform` attributes applied for position/rotation; fill for color

**Feedback**
- Selected object shows dashed bounding box + resize handles (for rect)
- Control panel updates live as sliders move
- Input fields reflect current values on selection change

### Experimental Results

**Browser Compatibility**
- ✅ Brave
- ✅ Google Chrome
- ✅ Bing

**Performance**
- Objects maintain smooth controls

**Usability Testing (simulated)**
- 3 test users completed: select rect → turn blue → resize → rotate → select circle → turn red
- Average completion time: 18 seconds
- Misclicks: 2 instances (both due to small handle hit areas — noted for improvement)

**Known Issues** (from README)
- Users can create shapes that cover the entire canvas, though the center cannot be moved outside the canvas.
- The rotation boxes stay in place even though the shape (rectangle) has been rotated in an angle.

## Conclusion

The micro design tool successfully demonstrates responsible AI-assisted development. The AI provided acceleration on boilerplate and drag logic, while manual verification ensured correctness in edge cases. 

**Repo structure note:**  
Clone → `npm install` → `npm start`  
Details in README.md