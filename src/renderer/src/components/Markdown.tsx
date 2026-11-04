// src/renderer/src/components/Markdown.tsx
import { isValidElement, ReactNode, useState } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import { Check, Copy } from 'lucide-react'
import { cn } from '@renderer/libs/utils'

interface MarkdownProps {
  content: string
  className?: string
}

// Component copy button — tách riêng để dùng lại
function CopyButton({ text }: { text: string }): React.JSX.Element {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 rounded bg-slate-700 p-1.5 text-slate-300 opacity-0 transition group-hover:opacity-100 hover:bg-slate-600"
      aria-label="Copy code"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  )
}

function extractText(node: ReactNode): string {
  if (node == null) return ''

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join('')
  }

  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    return extractText(props?.children)
  }

  return ''
}

const components: Components = {
  pre: ({ children, ...props }) => {
    // Identify the code container
    const childArray = Array.isArray(children) ? children : [children]
    const codeEl = childArray.find((c) => isValidElement(c))
    const className = isValidElement(codeEl)
      ? (codeEl.props as { className?: string }).className
      : undefined
    const isCode = className
      ? className.includes('language-') && !className.includes('language-less')
      : false
    // Extract the code
    let codeText = ''
    const codeChildren = isValidElement(codeEl)
      ? (codeEl.props as { children?: ReactNode }).children
      : undefined
    if (isCode && codeChildren) {
      codeText = extractText(codeChildren)
    }
    return (
      <div className="group relative">
        {isCode && <CopyButton text={codeText} />}
        <pre className="overflow-x-auto" {...props}>
          {children}
        </pre>
      </div>
    )
  },
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault() // chặn navigate trong app
        if (href) void window.api.sURL(href) // mở browser mặc định
      }}
      className="cursor-pointer text-blue-400 underline hover:text-blue-300"
      {...props}
    >
      {children}
    </a>
  )
}

export default function Markdown({ content, className }: MarkdownProps): React.JSX.Element {
  return (
    <div className={cn('prose prose-xl prose-invert max-w-none text-white', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: false, ignoreMissing: true }]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
