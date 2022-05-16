export default function HamburgerButton({ isOpen, setIsOpen }) {
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;
  return (
    <button
      className="flex flex-col self-end mt-4 mr-4 h-12 w-12 justify-center items-center group z-40 sm:hidden"
      onClick={() => setIsOpen(prev => !prev)}
    >
      <div
        className={`${genericHamburgerLine} ${isOpen
          ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
          : "opacity-50 group-hover:opacity-100"
          }`}

      />
      <div
        className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
          }`}
      />
      <div
        className={`${genericHamburgerLine} ${isOpen
          ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
          : "opacity-50 group-hover:opacity-100"
          }`}
      />
    </button>
  )
}