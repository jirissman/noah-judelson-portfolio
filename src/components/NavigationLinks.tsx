import Link from "next/link";

interface NavigationLinksProps {
  className?: string;
  linkClassName?: string;
  type?: "main" | "photography" | "all";
  layout?: "list" | "flex";
}

export default function NavigationLinks({
  className = "space-y-2",
  linkClassName = "text-gray-400 hover:text-white",
  type = "all",
  layout = "list",
}: NavigationLinksProps) {
  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
  ];

  const photographyLinks = [
    { href: "/landscape", label: "Landscape" },
    { href: "/real-estate", label: "Real Estate" },
    { href: "/motion", label: "Motion" },
  ];

  let linksToShow = [];
  if (type === "main") {
    linksToShow = mainLinks;
  } else if (type === "photography") {
    linksToShow = photographyLinks;
  } else {
    linksToShow = [...mainLinks, ...photographyLinks];
  }

  if (layout === "flex") {
    return (
      <ul className={className}>
        {linksToShow.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClassName}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={className}>
      {linksToShow.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={linkClassName}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
