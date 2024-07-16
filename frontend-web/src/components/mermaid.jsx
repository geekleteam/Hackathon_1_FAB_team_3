import React, { useEffect, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  DIAGRAM: 'diagram',
};

const DraggableDiagram = ({ children }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.DIAGRAM,
    item: { id: 'diagram' },
  }));

  return (
    <div ref={drag} style={{ cursor: 'move' }}>
      {children}
    </div>
  );
};

const Mermaid = ({ graphDefinition, getMermaidCodeResponse, setCount, count }) => {

  const zoomWrapperRef = useRef(null);

  useEffect(() => {
    const loadMermaid = async () => {
      if (graphDefinition === '') return;
      if (!window.mermaid) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/9.3.0/mermaid.min.js';
        script.onload = () => {
          window.mermaid.mermaidAPI.initialize({ securityLevel: 'loose' });
          renderMermaid();
        };
        document.body.appendChild(script);
      } else {
        renderMermaid();
      }
    };

    const renderMermaid = () => {
      try {
        const output = document.getElementById('output');
        output.removeAttribute('data-processed');
        window.mermaid.mermaidAPI.render('theGraph', graphDefinition, (svgCode) => {
          output.innerHTML = svgCode;
          fitToBounds();
        });
      } catch (err) {
        setCount(count + 1);
        console.log(err);
        if (count < 3) {
          getMermaidCodeResponse();
        }
      }
    };

    const fitToBounds = () => {
      if (zoomWrapperRef.current) {
        zoomWrapperRef.current.setTransform(0, 0, 2); // Set initial zoom to 2x
        setTimeout(() => {
          zoomWrapperRef.current.centerView(); // Center the view after setting the transform
        }, 0);
      }
    };

    loadMermaid();
  }, [graphDefinition]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!zoomWrapperRef.current) return;
      e.preventDefault();
      const { zoomIn, zoomOut } = zoomWrapperRef.current;
      if (e.deltaY < 0) {
        zoomIn(0.5); // Increase zoom level by a factor
      } else {
        zoomOut(0.5); // Decrease zoom level by a factor
      }
    };

    const container = document.getElementById('output-container');
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  if (graphDefinition === '') return <></>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <TransformWrapper
          ref={zoomWrapperRef}
          wheel={{ disabled: true }} // Disable default wheel zoom
          scale={{ maxScale: 10, minScale: 0.1 }} // Adjust the scale limits as needed
          initialScale={2} // Set initial scale to 2x
        >
          <TransformComponent>
            <div
              id="output-container"
              className="p-4 bg-gray-100 rounded-md shadow-md overflow-auto"
              style={{ minHeight: '100vh', minWidth: '70vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <DraggableDiagram>
                <div id="output" />
              </DraggableDiagram>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </DndProvider>
  );
};

export default Mermaid;
