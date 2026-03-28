import { Link, Outlet } from 'react-router-dom';
import Header from './Header';

const footerLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Contact', to: '/contact' },
];

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-4">
            <nav
              aria-label="Footer"
              className="flex flex-wrap justify-center gap-x-6 gap-y-2"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="text-center text-gray-600 text-sm">
              (c) {new Date().getFullYear()} Ghana Military Quiz. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
