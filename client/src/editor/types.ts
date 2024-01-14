import { OnMount } from "@monaco-editor/react";

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;
export type StandaloneCodeEditor = ArgumentTypes<OnMount>[0];
