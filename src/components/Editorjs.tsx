// @ts-nocheck
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { useState, useEffect, useRef } from "react";

function Editor({ content }) {
  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
        ejInstance.current.blocks.render({
          time: new Date().getTime(),
          blocks: content.blocks,
        });
      },
      autofocus: true,
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
    if (ejInstance.current !== null) {
      ejInstance?.current?.destroy();
    }

    if(ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [content]);

  return <div id="editorjs"></div>;
}

export default Editor;
