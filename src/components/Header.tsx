import NavigationLinks from "./NavigationLinks";
import SocialLinks from "./SocialLinks";

export default function Header() {
  return (
    <header className="fixed top-4 left-4 right-4 md:left-8 md:right-8 z-50">
      <div className="flex flex-col md:flex-row justify-between items-center py-4">
        {/* Name section - left side */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">
            Noah Judelson
          </h2>
          <p className="text-gray-100 mt-2 drop-shadow-md">Photography</p>
        </div>

        {/* Navigation and Social Links - right side */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 gap-6">
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
