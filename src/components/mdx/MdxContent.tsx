import { MDXRemote } from "next-mdx-remote/rsc";
import { OperatorNote } from "@/components/ui/OperatorNote";

const components = {
  OperatorNote,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-sky prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-blockquote:border-sky">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
