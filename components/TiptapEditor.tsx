import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FormEvent, useEffect, useState } from 'react';
import { db, storage } from '../utils/firebase';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/common.js';
import { useController, UseControllerProps } from 'react-hook-form';

// type Props = {
//   control: Control<TFieldValues>;
//   name: TName;
//   rules:;
//   content?: object;
// };

const TiptapEditor = (props: UseControllerProps<any>) => {
  // console.log(props, 'props');
  const { field, fieldState, formState } = useController(props);
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
    content: field.value,
    //useEffect で変更があったらcontentに
    onBlur() {
      field.onBlur();
    },
    onUpdate({ editor }) {
      //どんな型で返すか
      // console.log(
      //   field.onChange(editor.getJSON()),
      //   'field.onChange(editor.getJSON())'
      // );
      // console.log(editor.getJSON(), 'editor.getJSON()');
      field.onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border rounded-sm',
      },
    },
  });

  // エラー時にフォーカス
  useEffect(() => {
    if (fieldState.invalid) {
      editor?.commands?.focus();
    }
  }, [fieldState.invalid, formState.submitCount]);

  // 例外処理
  if (!editor) {
    return null;
  }

  // 画像
  const uploadImage = async (event: FormEvent<HTMLInputElement>) => {
    // input file
    const image = event.currentTarget.files?.[0];
    // storageのパス
    const imageRef = ref(storage, `news/${Date.now()}`);
    // 画像がアップロードされるのを待つ
    await uploadBytes(imageRef, image as Blob);
    // 画像のURL取得
    const imageURL = await getDownloadURL(imageRef);
    // editorのフォーカス部分に画像挿入
    editor.chain().focus().setImage({ src: imageURL }).run();
  };

  // console.log(editable);
  return (
    <div className="container">
      {/* {editable && ( */}
      <div className="flex">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={classNames(
            'border p-2',
            editor.isActive('bold') && 'bg-violet-600 font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-bold"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={classNames(
            'border p-2',
            editor.isActive('bulletList') &&
              'bg-violet-600 font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-list-unordered"></i>
        </button>
        <label className="border p-2">
          <i className="ri-image-add-line"></i>
          <input className="hidden" type="file" onChange={uploadImage} />
        </label>
      </div>
      {/* )} */}
      <EditorContent editor={editor} />
      {fieldState.error?.type === 'required' && '必須入力です'}
      {/* {editable && <button onClick={submit}>投稿</button>} */}
    </div>
  );
};

export default TiptapEditor;
