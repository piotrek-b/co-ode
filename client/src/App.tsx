import React from 'react';
import EditorContainer from './editor/EditorContainer';


const CODE = `
import React from 'react';
import EditorContainer from './editor/EditorContainer';

function App() {
  return (
    <main>
      <EditorContainer defaultLanguage='javascript' readOnly defaultValue='blabla' />
    </main>
  );
}

export default App;
`

function App() {
  return (
    <main>
      <EditorContainer defaultLanguage='javascript' readOnly defaultValue={CODE} />
    </main>
  );
}

export default App;
