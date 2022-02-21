import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FormEvent, useEffect, useState } from 'react';
import { db, storage } from '../utils/firebase';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/common.js';

const TiptapRender = ({
  editable = true,
  content = '<p>hello</p>',
}: {
  editable: boolean;
  content: { content: object[] } | string;
}) => {
  // classの連結
  const classNames = (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(' ');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-h-20 rounded',
        },
      }),
    ],
    content,
    editorProps: {
      editable: () => editable,
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border rounded-sm',
      },
    },
  });

  // 例外処理
  if (!editor) {
    return null;
  }

  // console.log(editable);
  // console.log(content, 'content');
  return (
    <div className="container">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapRender;
