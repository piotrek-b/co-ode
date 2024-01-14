import React, { useCallback, useEffect, useRef } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { useDarkMode } from "usehooks-ts";
import { StandaloneCodeEditor, ModelContentChangeEvent } from './types'
import { decorateMatching } from './utils'
import { Model } from 'json-joy/es2020/json-crdt';
import '../App.css'

import { EditorCRDT } from "../crdt/editor";
import { WsClient } from "../api/ws-client";

interface EditorContainerProps {
  defaultLanguage: string;
  defaultValue: string;
  readOnly?: boolean;
}


const EditorContainer = ({
  defaultLanguage,
  defaultValue,
  readOnly,
}: EditorContainerProps) => {
  const { isDarkMode } = useDarkMode();
  const codeEditorRef = useRef<StandaloneCodeEditor | null>(null);
  const editor = new EditorCRDT(defaultValue, new WsClient())

  const theme = isDarkMode ? "vs-dark" : "light";
  const model = Model.withLogicalClock()
  model.api.root({
    text: defaultValue
  })

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

  const onChange = (value: string | undefined, event: ModelContentChangeEvent) => {
    const { text, rangeOffset } = event.changes[0]
    editor.push(text, rangeOffset)
  }

  return (
    <div>
      <MonacoEditor
        onChange={onChange}
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
