import { Link } from '@remix-run/react';

export const navLinks = [
  {
    href: "/",
    label: "My card"
  },
  {
    href: "/cards",
    label: "View All Cards"
  },
  {
    href: "/cards/new",
    label: "Create a card"
  },
  {
    href: "/contacts",
    label: "View contacts"
  },
  {
    href: "/scanner",
    label: "Scan a contact"
  },
];

export const navStyles = "bg-sky-900 text-gray-300";

export default function Navbar() {
  return (
    <nav className={`hidden sm:flex sm:flex-col w-1/3 lg:w-1/6 h-full ${navStyles}`}>
      <div className="m-auto space-y-10">
        {navLinks.map(({ href, label }) => (
          <div key={label}>
            <Link to={href}>{label}</Link>
          </div>
        ))}
      </div>
    </nav>
  )
};