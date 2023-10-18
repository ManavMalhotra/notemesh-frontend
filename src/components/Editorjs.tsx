import React, { useEffect, useState, useRef } from "react";
import Editor from "@stfy/react-editor.js";
import Header from "@editorjs/header";
import List from "@editorjs/list";

function Editorjs({ content }) {
  
  console.log("Editor: ", content);

  return (
    <>
      <Editor
        tools={{
          header: Header,
          list: List,
        }}
        onReady={() => console.log("Start!")}
        data={{
          time: 1697635405686,
          blocks: [
            {
              id: "MLTFnT_THe",
              type: "header",
              data: { text: "Key Insights", level: 1 },
            },
            {
              id: "UMqzi0U9CW",
              type: "list",
              data: {
                style: "unordered",
                items: ["Item 1", "Item 2", "Item 3"],
              },
            },
          ],
          version: "2.28.0",
        }}
      />
    </>
  );
}

export default Editorjs;
