import NavigationLinks from "./NavigationLinks";
import SocialLinks from "./SocialLinks";

export default function Header() {
  return (
    <header className="absolute top-4 right-4 left-4 z-50 bg-transparent md:right-8 md:left-8">
      <div className="flex flex-col items-center justify-between py-4 md:flex-row">
        {/* Name section - left side */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">
            Noah Judelson
          </h2>
          <p className="mt-2 text-gray-100 drop-shadow-md">Photography</p>
        </div>

        {/* Navigation and Social Links - right side */}
        <div className="flex flex-col items-center gap-6 space-y-6 md:flex-row md:space-y-0">
          <NavigationLinks
            type="main"
            className="flex gap-4"
            linkClassName="text-white hover:text-gray-300 font-medium transition-colors duration-200 drop-shadow-md text-lg"
            layout="flex"
          />

          <SocialLinks
            className="flex gap-4"
            iconSize="w-6 h-6"
            linkClassName="text-white hover:text-gray-300 transition-colors duration-200 drop-shadow-md"
          />
        </div>
      </div>
    </header>
  );
}
