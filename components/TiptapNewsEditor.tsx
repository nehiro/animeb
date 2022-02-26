import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FormEvent, useCallback, useEffect } from 'react';
import { Noop } from 'react-hook-form';
import { lowlight } from 'lowlight/lib/common.js';
import Image from '@tiptap/extension-image';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../utils/firebase';
import Link from '@tiptap/extension-link';

const TiptapNewsEditor = ({
  value,
  onChange,
  onBlur,
}: {
  value: { content: object[] };
  onChange: (data: '' | JSONContent) => void;
  onBlur: Noop;
}) => {
  // console.log(value, 'value');
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
        openOnClick: false,
      }),
    ],
    // content: 'xxx',
    onUpdate({ editor }) {
      onChange(editor.isEmpty ? '' : editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          'focus:outline-none block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2 text-sm',
      },
    },
  });

  useEffect(() => {
    editor?.commands.setContent(value);
  }, [value, editor]);

  // classの連結
  const classNames = (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(' ');

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
    editor?.chain().focus().setImage({ src: imageURL }).run();
  };

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }, [editor]);

  const editorFunctions = [
    {
      function: 'toggleHeading({ level: 1 })',
      activeName: "'heading', { level: 1 }",
      icon: 'ri-h-1',
    },
    {
      function: 'toggleHeading({ level: 2 })',
      activeName: "'heading', { level: 2 }",
      icon: 'ri-h-2',
    },
    {
      function: 'toggleHeading({ level: 3 })',
      activeName: "'heading', { level: 3 }",
      icon: 'ri-h-3',
    },
    {
      function: 'toggleBold()',
      activeName: 'bold',
      icon: 'ri-bold',
    },
    {
      function: 'toggleBulletList()',
      activeName: 'bulletList',
      icon: 'ri-list-unordered',
    },
    {
      function: 'toggleOrderedList()',
      activeName: 'orderedList',
      icon: 'ri-list-ordered',
    },
    {
      function: 'toggleBlockquote()',
      activeName: 'blockquote',
      icon: 'ri-indent-increase',
    },
    {
      function: 'toggleItalic()',
      activeName: 'italic',
      icon: 'ri-italic',
    },
    {
      function: 'toggleStrike()',
      activeName: 'strike',
      icon: 'ri-strikethrough-2',
    },
    {
      function: 'toggleCodeBlock()',
      activeName: 'codeBlock',
      icon: 'ri-code-view',
    },
    {
      function: 'setLink()',
      activeName: 'link',
      icon: 'ri-link',
    },
    {
      function: 'unsetLink()',
      activeName: 'link',
      icon: 'ri-link-unlink',
    },
  ];

  if (!editor) {
    return null;
  }
  return (
    <>
      <div className="grid grid-cols-7">
        {/* {editorFunctions.map((editorFunction) => 
          <button
          onClick={() =>
            editor.chain().focus().`${editorFunction.function}`.run()
          }
          className={
            editor.isActive(`${editorFunction.activeName}`) ? 'is-active' : ''
          }
          type="button"
        >
          <i className={`${editorFunction.icon}`}></i>
        </button>
        )} */}

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={classNames(
            'p-2',
            editor.isActive('heading', { level: 1 }) &&
              'bg-purple font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-h-1"></i>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={classNames(
            'p-2',
            editor.isActive('heading', { level: 2 }) &&
              'bg-purple font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-h-2"></i>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={classNames(
            'p-2',
            editor.isActive('heading', { level: 3 }) &&
              'bg-purple font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-h-3"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={classNames(
            'p-2',
            editor.isActive('bold') && 'bg-purple font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-bold"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={classNames(
            'p-2',
            editor.isActive('bulletList') && 'bg-purple font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-list-unordered"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={classNames(
            'p-2',
            editor.isActive('orderedList') && 'bg-purple font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-list-ordered"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={classNames(
            'p-2',
            editor.isActive('blockquote') && 'bg-purple font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-indent-increase"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={classNames(
            'p-2',
            editor.isActive('italic') && 'bg-purple font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-italic"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={classNames(
            'p-2',
            editor.isActive('strike') && 'bg-purple font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-strikethrough-2"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={classNames(
            'p-2',
            editor.isActive('codeBlock') && 'bg-purple font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-code-view"></i>
        </button>
        <button
          onClick={setLink}
          className={classNames(
            'p-2',
            editor.isActive('link') && 'bg-purple font-bold text-white'
          )}
          type="button"
        >
          <i className="ri-link"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
          type="button"
        >
          <i className="ri-link-unlink"></i>
        </button>
        <label className="p-2 text-center">
          <i className="ri-image-add-line"></i>
          <input className="hidden" type="file" onChange={uploadImage} />
        </label>
      </div>
      <EditorContent onBlur={onBlur} editor={editor} />
    </>
  );
};

export default TiptapNewsEditor;
