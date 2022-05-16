import MobileNavOverlay from './MobileNavOverlay';
import HamburgerNav from './HamburgerButton';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <MobileNavOverlay isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col sm:flex-row items-center w-full h-screen z-20">
        <Navbar />
        <HamburgerNav isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="w-full flex items-center justify-center h-full">
          {children}
        </main>
      </div>
    </>
  )
}