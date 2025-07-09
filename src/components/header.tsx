import Link from "next/link";
import NavigationLinks from "./NavigationLinks";
import SocialLinks from "./SocialLinks";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Name section - left side */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">Noah Judelson</h2>
            <p className="text-gray-100 mt-2 drop-shadow-md">Photography</p>
          </div>
          
          {/* Navigation and Social Links - right side */}
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 gap-2">
            <NavigationLinks 
              type="main" 
              className="flex gap-2"
              linkClassName="text-white hover:text-gray-300 font-medium transition-colors duration-200 drop-shadow-md text-lg"
              layout="flex"
            />
            
            <SocialLinks 
              className="flex gap-2"
              iconSize="w-6 h-6"
              linkClassName="text-white hover:text-gray-300 transition-colors duration-200 drop-shadow-md"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
