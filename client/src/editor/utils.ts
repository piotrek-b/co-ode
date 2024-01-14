import { StandaloneCodeEditor } from "./types";

const findMatches = (editor: StandaloneCodeEditor, value: string) => {
  return editor
    .getModel()
    ?.findMatches(value, false, false, false, null, false, undefined);
};

export const decorateMatching = (
  editor: StandaloneCodeEditor,
  value: string,
  { className }: { className: string }
) => {
  const matches = findMatches(editor, value);
  matches?.forEach((match) => {
    editor.createDecorationsCollection([
      {
        range: match.range,
        options: {
          isWholeLine: false,
          inlineClassName: className,
        },
      },
    ]);
  });
};
