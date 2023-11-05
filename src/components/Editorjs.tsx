// @ts-nocheck
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { useState, useEffect, useRef } from "react";
import { collection, doc, updateDoc, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../utils/firebase";

function Editor({ content }) {
  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
        ejInstance.current.blocks.render({
          time: new Date().getTime(),
          blocks: content.content.blocks,
        });
      },
      autofocus: true,
      onChange: async () => {
        let current_content = await editor.saver.save();

        setTimeout(() => {
          onSave(current_content);
          console.log("Saving...", current_content);
        }, 3000);
      },
      tools: {
        header: Header,
        list: List,
      },
    });
  };

  const onSave = async (current_content) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user?.uid;

      // if (userId) {
      //   console.log("id", content.id);
      //   const noteRef = doc(db, "users", userId, "notes", content.id);
      //   await updateDoc(noteRef, {
      //     content: JSON.stringify(savedData),
      //   }).then(() => {
      //     console.log("Note Saved");
      //   });
      // }

      if (ejInstance.current) {
        console.log("savedData", current_content);

        await updateDoc(doc(db, "users", userId, "notes", content.id), {
          content: JSON.stringify(current_content),
        }).then(() => {
          console.log("Note Saved");
        });
      }
    } catch (error) {
      console.log("error on save", error);
    }
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    if (ejInstance.current !== null) {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
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
