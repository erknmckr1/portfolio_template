"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Quote,
    Undo,
    Redo,
    Code,
    Palette,
    Table as TableIcon,
    Plus,
    Trash2,
    Type
} from 'lucide-react'

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null
    }

    const buttons = [
        {
            icon: <Heading1 size={18} />,
            title: 'H1',
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive('heading', { level: 1 }),
        },
        {
            icon: <Heading2 size={18} />,
            title: 'H2',
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive('heading', { level: 2 }),
        },
        {
            icon: <Heading3 size={18} />,
            title: 'H3',
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editor.isActive('heading', { level: 3 }),
        },
        {
            icon: <Bold size={18} />,
            title: 'Bold',
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold'),
        },
        {
            icon: <Italic size={18} />,
            title: 'Italic',
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic'),
        },
        {
            icon: <List size={18} />,
            title: 'Bullet List',
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive('bulletList'),
        },
        {
            icon: <ListOrdered size={18} />,
            title: 'Ordered List',
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive('orderedList'),
        },
        {
            icon: <Quote size={18} />,
            title: 'Blockquote',
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: editor.isActive('blockquote'),
        },
        {
            icon: <Code size={18} />,
            title: 'Kod Bloğu',
            action: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: editor.isActive('codeBlock'),
        },
        {
            icon: <Undo size={18} />,
            title: 'Geri Al',
            action: () => editor.chain().focus().undo().run(),
            isActive: false,
        },
        {
            icon: <Redo size={18} />,
            title: 'İleri Al',
            action: () => editor.chain().focus().redo().run(),
            isActive: false,
        },
    ]

    const tableActions = [
        {
            icon: <TableIcon size={18} />,
            title: 'Tablo Ekle',
            action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
        },
        {
            icon: <div className="flex items-center gap-0.5"><Plus size={12} /><TableIcon size={14} /></div>,
            title: 'Sütun Ekle',
            action: () => editor.chain().focus().addColumnAfter().run(),
        },
        {
            icon: <div className="flex items-center gap-0.5"><Plus size={12} className="rotate-90" /><TableIcon size={14} /></div>,
            title: 'Satır Ekle',
            action: () => editor.chain().focus().addRowAfter().run(),
        },
        {
            icon: <div className="flex items-center gap-0.5"><Trash2 size={12} /><TableIcon size={14} /></div>,
            title: 'Tabloyu Sil',
            action: () => editor.chain().focus().deleteTable().run(),
        }
    ]

    const colors = [
        { name: 'Siyah', color: '#000000' },
        { name: 'Gri', color: '#6B7280' },
        { name: 'Kırmızı', color: '#EF4444' },
        { name: 'Mavi', color: '#3B82F6' },
        { name: 'Yeşil', color: '#10B981' },
        { name: 'Sarı', color: '#F59E0B' },
        { name: 'Mor', color: '#8B5CF6' },
        { name: 'Pembe', color: '#EC4899' },
    ]

    return (
        <div className="flex flex-col border-b-2 border-black bg-gray-50">
            <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200">
                {buttons.map((btn, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={btn.action}
                        title={btn.title}
                        className={`p-2 border-2 border-transparent hover:border-black hover:bg-white transition-all ${btn.isActive ? 'bg-black text-white border-black' : 'text-black'
                            }`}
                    >
                        {btn.icon}
                    </button>
                ))}

                <div className="w-px h-8 bg-gray-300 mx-1 self-center" />

                {tableActions.map((btn, i) => (
                    <button
                        key={`table-${i}`}
                        type="button"
                        onClick={btn.action}
                        title={btn.title}
                        className="p-2 border-2 border-transparent hover:border-black hover:bg-white transition-all text-black"
                    >
                        {btn.icon}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 p-2 bg-white">
                <span className="flex items-center gap-1 text-xs font-bold uppercase ml-1">
                    <Palette size={14} /> Renk:
                </span>
                <div className="flex gap-1">
                    {colors.map((c) => (
                        <button
                            key={c.color}
                            type="button"
                            onClick={() => editor.chain().focus().setMark('textStyle', { color: c.color }).run()}
                            title={c.name}
                            className={`w-6 h-6 border border-black hover:scale-110 transition-transform ${editor.isActive('textStyle', { color: c.color }) ? 'ring-2 ring-black ring-offset-1' : ''
                                }`}
                            style={{ backgroundColor: c.color }}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().unsetMark('textStyle').run()}
                        title="Rengi Sıfırla"
                        className="px-2 text-[10px] font-bold border border-black hover:bg-black hover:text-white transition-colors uppercase"
                    >
                        Sıfırla
                    </button>
                </div>
            </div>
        </div>
    )
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl outline-none p-4 min-h-[300px] max-w-none',
            },
        },
    })

    return (
        <div className="w-full border-2 border-black focus-within:bg-teal-50 transition-colors overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />

            <style jsx global>{`
                .tiptap p { margin-bottom: 1rem; }
                .tiptap ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
                .tiptap ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
                .tiptap h1 { font-size: 2rem; font-weight: 800; margin-bottom: 1.5rem; }
                .tiptap h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.25rem; }
                .tiptap h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; }
                .tiptap blockquote { border-left: 4px solid black; padding-left: 1rem; font-style: italic; margin-bottom: 1rem; }
                .tiptap pre { background: #1a1a1a; color: #f8f8f2; padding: 1rem; border-radius: 8px; font-family: 'Courier New', Courier, monospace; margin-bottom: 1rem; overflow-x: auto; }
                .tiptap code { background: none; color: inherit; padding: 0; }
                .tiptap p code { background: #eee; padding: 0.2rem 0.4rem; border-radius: 4px; color: #d63384; }
                
                /* Table Styles */
                .tiptap table { border-collapse: collapse; table-layout: fixed; width: 100%; margin: 0; overflow: hidden; border: 2px solid black; }
                .tiptap table td, .tiptap table th { min-width: 1em; border: 1px solid #ddd; padding: 3px 5px; vertical-align: top; box-sizing: border-box; position: relative; }
                .tiptap table th { font-weight: bold; text-align: left; background-color: #f1f1f1; border-bottom: 2px solid black; }
                .tiptap table .selectedCell:after { z-index: 2; position: absolute; content: ""; left: 0; right: 0; top: 0; bottom: 0; background: rgba(200, 200, 255, 0.4); pointer-events: none; }
                .tiptap table .column-resize-handle { position: absolute; right: -2px; top: 0; bottom: -2px; width: 4px; background-color: #adf; pointer-events: none; }
                .tiptap .tableWrapper { overflow-x: auto; margin-bottom: 1.5rem; }
            `}</style>
        </div>
    )
}

export default TiptapEditor
