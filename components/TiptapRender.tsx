import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { db, storage } from '../utils/firebase';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/common.js';
import { Noop } from 'react-hook-form';
import Link from '@tiptap/extension-link';

const TiptapRender = ({
  value,
  onChange,
  onBlur,
}: {
  value: { content: object[] };
  onChange: (data: '' | JSONContent) => void;
  onBlur: Noop;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'w-full rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: true,
      }),
    ],
    // content: 'xxx',
    onUpdate({ editor }) {
      onChange(editor.isEmpty ? '' : editor.getJSON());
    },
    editorProps: {
      editable: () => false,
    },
  });

  useEffect(() => {
    editor?.commands.setContent(value);
  }, [value, editor]);

  if (!editor) {
    return null;
  }
  return (
    <>
      <EditorContent onBlur={onBlur} editor={editor} />
    </>
  );
};

export default TiptapRender;
