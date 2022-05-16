import { Link } from "@remix-run/react";
import HamburgerButton from "./HamburgerButton";
import { navLinks, navStyles } from '~/components/Navbar';

export default function MobileNavOverlay({ isOpen, setIsOpen }) {
  return (
    <div className={`${isOpen ? "flex" : "hidden"} flex-col w-screen h-screen z-30 sm:hidden ${navStyles}`}>
      <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="m-auto text-xl space-y-10">
        {navLinks.map(({ href, label }) => (
          <div key={label}>
            <Link to={href}>{label}</Link>
          </div>
        ))}
      </div>
    </div>
  )
};