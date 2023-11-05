// @ts-nocheck
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { useState, useEffect, useRef } from "react";

function Editor({ content }) {
  const [editorContent, setEditorContent] = useState(content);

  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: editorContent,
      onChange: async () => {
        let content = await editor.saver.save();
      },
      tools: {
        header: Header,
        list: List,
      },
    });
  };

  useEffect(() => {
    setEditorContent(content);

    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return <div id="editorjs"></div>;
}

export default Editor;
