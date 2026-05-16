import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  href?: string;
  buttonText?: string;
}

export function PageHeader({
  title,
  description,
  action,
  href,
  buttonText,
}: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {description && (
          <p className="text-sm text-zinc-400 mt-1">{description}</p>
        )}
      </div>

      {/* Priority: action prop over href button */}
      {action && <div>{action}</div>}
      {!action && href && buttonText && (
        <Link href={href}>
          <button className="bg-white text-black px-3 py-2 rounded-md text-sm">
            {buttonText}
          </button>
        </Link>
      )}
    </div>
  );
}
