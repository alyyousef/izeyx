type TocItem = { id: string; label: string };

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Table of contents" className="border border-border p-6">
      <p className="label text-muted-soft">On this page</p>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-sm text-foreground hover:text-primary-text">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
