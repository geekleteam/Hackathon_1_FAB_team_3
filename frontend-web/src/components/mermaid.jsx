import React, { useEffect } from 'react';

const Mermaid = ({ graphDefinition }) => {

  useEffect(() => {
    const loadMermaid = async () => {
      if(graphDefinition === "")return;
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
      const output = document.getElementById('output');
      output.removeAttribute('data-processed');
      window.mermaid.mermaidAPI.render('theGraph', graphDefinition, (svgCode) => {
        output.innerHTML = svgCode;
      });
    };

    loadMermaid();
  }, [graphDefinition]);

  if(graphDefinition === "")return (<></>)
    
    return (
    <div className="w-full flex flex-col items-center justify-center text-center min-h-screen bg-gray-100">
      <div id="output" className="w-full mt-4 p-4 bg-white rounded-md shadow-md"></div>
    </div>
  );


};

export default Mermaid;
