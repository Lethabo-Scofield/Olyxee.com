import { FC, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Check, Copy } from "lucide-react";

export type CodeSample = {
  label: string;
  lang: string;
  code: string;
};

const CodeBlock: FC<CodeSample> = ({ label, lang, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="rounded-2xl bg-[#0b0b0d] ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.18)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="text-[13px] font-medium text-neutral-300 truncate">
            {label}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 hover:text-white transition-colors px-2.5 py-1 rounded-full hover:bg-white/10 active:scale-95"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" strokeWidth={2.2} />
          ) : (
            <Copy className="w-3.5 h-3.5" strokeWidth={2} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={lang}
        style={coldarkDark}
        customStyle={{
          margin: 0,
          background: "transparent",
          padding: "1.125rem 1.25rem",
          fontSize: "12.5px",
          lineHeight: 1.7,
        }}
        codeTagProps={{
          style: {
            fontFamily:
              '"SF Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
