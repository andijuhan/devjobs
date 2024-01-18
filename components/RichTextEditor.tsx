"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Editor, EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default forwardRef<Object, EditorProps>(
  function RichTextEditor(props, ref) {
    return (
      <Editor
        {...props}
        editorClassName={cn(
          "border rounded-md px-3 min-h-[150px] cursor-text",
          props.editorClassName,
        )}
      />
    );
  },
);
