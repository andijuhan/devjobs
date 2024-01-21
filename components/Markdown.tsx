import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="prose-ul:list-inside prose-ul:list-disc prose-a:text-green-500 prose-a:underline space-y-3"
      components={{
        a: (props) => <a target="_blank" rel="nofollow" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
