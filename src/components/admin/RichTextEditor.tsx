'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
});

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet'
  ];

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 focus-within:border-or focus-within:ring-4 focus-within:ring-or/5 transition-all duration-300">
      <style>{`
        .ql-container {
          font-family: inherit;
          font-size: 0.875rem;
          min-height: 151px;
        }
        .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #f1f5f9;
          background: #f8fafc;
          padding: 8px 12px;
        }
        .ql-container.ql-snow {
          border: none;
        }
        .ql-editor {
          padding: 16px;
          min-height: 150px;
        }
        .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
          left: 16px;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
