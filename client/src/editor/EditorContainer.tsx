import React, { useCallback, useEffect, useRef } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { useDarkMode } from "usehooks-ts";
import { StandaloneCodeEditor } from './types'
import { decorateMatching } from './utils'

import '../App.css'

interface EditorContainerProps {
  defaultLanguage: string;
  defaultValue: string;
  readOnly: boolean;
}

const EditorContainer = ({
  defaultLanguage,
  defaultValue,
  readOnly,
}: EditorContainerProps) => {
  const { isDarkMode } = useDarkMode();
  const codeEditorRef = useRef<StandaloneCodeEditor | null>(null);

  const theme = isDarkMode ? "vs-dark" : "light";

  const testDecoration = useCallback(() => {
    if (codeEditorRef.current !== null) {
      decorateMatching(codeEditorRef.current, 'import', { className: 'someClassName'})
    }
  }, [codeEditorRef])

  const handleEditorDidMount: OnMount = useCallback((editor) => {
    codeEditorRef.current = editor;
    testDecoration()
  }, [testDecoration]);

  useEffect(testDecoration, [codeEditorRef, testDecoration]);

  return (
    <div>
      <MonacoEditor
        onMount={handleEditorDidMount}
        height="50vh"
        width="50vw"
        defaultLanguage={defaultLanguage}
        defaultValue={defaultValue}
        options={{ readOnly }}
        theme={theme}
      />
    </div>
  );
};

export default EditorContainer;
