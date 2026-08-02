import Link from "next/link";
import { authors, type AuthorKey } from "@/lib/site";

export function AuthorByline({
  authorKey,
  publishedAt,
  readingTime,
}: {
  authorKey: AuthorKey;
  publishedAt: string;
  readingTime: string;
}) {
  const author = authors[authorKey];
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="not-prose flex items-center gap-3 border-b border-mid/20 pb-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-paper">
        {author.name.charAt(0)}
      </div>
      <div className="text-sm">
        <Link href={author.href} className="font-medium text-ink hover:text-sky">
          {author.name}
        </Link>
        <p className="text-mid">
          {author.title} · {date} · {readingTime}
        </p>
      </div>
    </div>
  );
}
