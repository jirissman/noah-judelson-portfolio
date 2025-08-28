import SocialLinks from "./SocialLinks";
import NavigationLinks from "./NavigationLinks";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h4 className="mb-4 text-2xl font-bold">Noah Judelson</h4>
            <p className="text-gray-400">
              Photographing landscapes, wildlife, aircraft, and whatever else
              catches my eye.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="mb-4 text-lg font-semibold">Quick Links</h5>
            <NavigationLinks type="main" />
          </div>

          {/* Photography Categories */}
          <div>
            <h5 className="mb-4 text-lg font-semibold">Photography</h5>
            <NavigationLinks type="photography" />
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="mb-4 text-lg font-semibold">Contact</h5>
            <ul className="space-y-2 text-gray-400">
              <li>📧 judelsonnoah@gmail.com</li>
              <li>📱 (508) 776-8473</li>
              <li>📍 Boulder, CO | Cape Cod, MA</li>
            </ul>
            <SocialLinks className="mt-4 flex gap-2" />
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Noah Judelson Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
