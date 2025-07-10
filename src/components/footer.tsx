import SocialLinks from "./SocialLinks";
import NavigationLinks from "./NavigationLinks";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h4 className="text-2xl font-bold mb-4">Noah Judelson</h4>
            <p className="text-gray-400">
              Photographing landscapes, wildlife, aircraft, and whatever else
              catches my eye.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <NavigationLinks type="main" />
          </div>

          {/* Photography Categories */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Photography</h5>
            <NavigationLinks type="photography" />
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact</h5>
            <ul className="space-y-2 text-gray-400">
              <li>📧 judelsonnoah@gmail.com</li>
              <li>📱 (508) 776-8473</li>
              <li>📍 Boulder, CO | Cape Cod, MA</li>
            </ul>
            <SocialLinks className="flex gap-2 mt-4" />
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Noah Judelson Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
