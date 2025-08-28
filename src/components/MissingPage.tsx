import Link from "next/link";

/**
 * MissingPage - A reusable component for displaying error, empty, or unauthorized states
 *
 * Usage Examples:
 *
 * 1. Basic usage:
 * <MissingPage
 *   title="Page Not Found"
 *   description="The page you're looking for doesn't exist."
 *   actionText="Go Home"
 *   actionHref="/"
 * />
 *
 * 2. Using preset components:
 * <PageNotSetup pageType="About Page" studioPath="about" />
 * <EmptyContent contentType="Photos" createHref="/studio/structure/photo" />
 * <UnauthorizedAccess loginHref="/auth/login" />
 */

interface MissingPageProps {
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
  message?: string;
  icon?: string;
  variant?: "error" | "empty";
}

export default function MissingPage({
  title,
  description,
  actionText,
  actionHref,
  message,
  icon = "⚠️",
  variant = "error",
}: MissingPageProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "empty":
        return {
          border: "border-blue-500",
          background: "bg-blue-500/10",
          titleColor: "text-blue-400",
          buttonBg: "bg-blue-400",
          buttonHover: "hover:bg-blue-500",
        };
      default: // error
        return {
          border: "border-amber-500",
          background: "bg-amber-500/10",
          titleColor: "text-amber-400",
          buttonBg: "bg-yellow-400",
          buttonHover: "hover:bg-amber-500",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div
        className={`max-w-md rounded-lg border ${styles.border} ${styles.background} p-8 text-center`}
      >
        <div className="mb-4 text-4xl">{icon}</div>
        <h2 className={`mb-4 text-xl font-semibold ${styles.titleColor}`}>
          {title}
        </h2>
        <p className="mb-6 text-gray-300">{description}</p>
        <Link
          href={actionHref}
          className={`inline-block rounded-lg ${styles.buttonBg} px-6 py-3 font-medium text-black underline decoration-2 underline-offset-4 transition-colors ${styles.buttonHover}`}
        >
          {actionText}
        </Link>
        {message && <p className="mt-6 text-gray-400">{message}</p>}
      </div>
    </div>
  );
}

// Preset components for common scenarios
export function PageNotSetup({
  pageType,
  studioPath,
}: {
  pageType: string;
  studioPath: string;
}) {
  return (
    <MissingPage
      title={`${pageType} Not Found`}
      description="This page hasn't been set up yet."
      actionText={`Create ${pageType} in Sanity Studio`}
      actionHref={`/studio/structure/${studioPath}`}
      variant="error"
    />
  );
}

export function EmptyContent({
  contentType,
  createHref,
  message,
}: {
  contentType: string;
  createHref: string;
  message?: string;
}) {
  return (
    <MissingPage
      title={`No ${contentType} Found`}
      description={`There are no ${contentType.toLowerCase()} to display yet.`}
      actionText={`Add ${contentType}`}
      actionHref={createHref}
      message={message}
      icon="📂"
      variant="empty"
    />
  );
}
