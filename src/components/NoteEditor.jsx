// src/components/NoteEditor.jsx
import { useEffect } from 'react';
import { useEditor, EditorContent , FloatingMenu,BubbleMenu} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';

export default function NoteEditor({ content, onChange }) {
    console.log(content)
  const editor = useEditor({
    extensions:[
      StarterKit,
      Underline,
      Strike,
      Code,
      Highlight,
      Link.configure({ openOnClick: false }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

   // Update editor content when `content` prop changes
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]); 

  console.log(editor.content)
  return (
    <div className="border rounded p-4">
      <EditorContent editor={editor} />
       <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="flex space-x-2 bg-white shadow p-2 rounded border">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'font-bold' : ''}>B</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'italic' : ''}>I</button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'underline' : ''}>U</button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'line-through' : ''}>S</button>
          <button onClick={() => editor.chain().focus().toggleCode().run()} className="bg-gray-200 px-1">`</button>
          <button onClick={() => editor.chain().focus().toggleHighlight().run()} className="bg-yellow-200 px-1">H</button>
          <button onClick={() => {
            const url = prompt("Enter link:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}>🔗</button>
        </div>
      </BubbleMenu>
    </div>
  );
}
