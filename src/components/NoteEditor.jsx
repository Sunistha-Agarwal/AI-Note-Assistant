// src/components/NoteEditor.jsx
import { useEffect, useState } from "react";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { summarizeNote } from "../services/geminiService";

export default function NoteEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Link.configure({ openOnClick: false }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  const [summary, setSummary] = useState("");
  // Update editor content when `content` prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  function handleSummarizeNote() {
    if (!editor) return;
    const currentContent = editor.getText();

    summarizeNote(currentContent).then((summary) => {
      if (summary) {
        setSummary(summary);
      }
    });
  }

  return (
    <div className="border rounded p-4">
      <div>
        <EditorContent editor={editor} />
        {editor && (
          <>
            <FloatingMenu
              editor={editor}
              className="absolute z-10 bg-white border border-gray-200 shadow-md rounded px-2 py-1 space-x-2"
              tippyOptions={{ duration: 100 }}
              shouldShow={({ editor }) => {
                const { $from } = editor.state.selection;
                return $from.parent.content.size === 0;
              }}
            >
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className="text-sm px-2 py-1 hover:bg-gray-100 rounded"
              >
                H1
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className="text-sm px-2 py-1 hover:bg-gray-100 rounded"
              >
                List
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className="text-sm px-2 py-1 hover:bg-gray-100 rounded"
              >
                Code
              </button>
            </FloatingMenu>

            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <div className="flex space-x-2 bg-white shadow p-2 rounded border">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "font-bold" : ""}
                >
                  B
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "italic" : ""}
                >
                  I
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={editor.isActive("underline") ? "underline" : ""}
                >
                  U
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={editor.isActive("strike") ? "line-through" : ""}
                >
                  S
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleHighlight().run()}
                  className="bg-yellow-200 px-1"
                >
                  H
                </button>
                <button
                  onClick={() => {
                    const url = prompt("Enter link:");
                    if (url)
                      editor.chain().focus().setLink({ href: url }).run();
                  }}
                >
                  🔗
                </button>
              </div>
            </BubbleMenu>
          </>
        )}
      </div>
      <button
        onClick={handleSummarizeNote}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        Summarize Note
      </button>
      {summary && (
        <div className="mt-4 p-3 bg-gray-100 rounded border">
          <strong>Summary:</strong>
          <div>{summary}</div>
        </div>
      )}
    </div>
  );
}
