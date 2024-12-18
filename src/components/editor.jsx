import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag.js";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";
// import { Check, ChevronsUpDown } from "lucide-react";

// import { cn } from "../lib/utils";
// import { Button } from "../components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "../components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../components/ui/popover";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef();
  useEffect(() => {
    async function init() {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById("textEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current.on("change", (instance, changes) => {
        console.log(changes);
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code)
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        console.log(code);
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return()=>{
      socketRef.current.off(ACTIONS.CODE_CHANGE)
    }
  }, [socketRef.current]);
  return (
    <>
      <textarea id="textEditor"></textarea>
    </>
  );
};

export default Editor;
