import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="space-y-3 prose-a:text-green-500 prose-a:underline prose-ul:list-outside prose-ul:list-disc prose-ul:pl-4"
      components={{
        a: (props) => <a target="_blank" rel="nofollow" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
