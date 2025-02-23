import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-md">
      <header className="h-16 border-b border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="flex-1"></div>
          <div className="flex items-center justify-center space-x-3">
            <img
              alt="CopyCoder Logo"
              fetchPriority="high"
              width="36"
              height="36"
              decoding="async"
              className="w-9 h-9"
              src="https://copycoder.ai/_next/image?url=%2Fcopycoder-logo-new.png&w=96&q=75"
            />
            <span className="text-xl font-styrene-a font-black text-white">
              CopyCoder
            </span>
          </div>
          <div className="flex-1 flex justify-end">
            <a href="/pricing">
              <div className="bg-gradient-to-r from-[#233997] to-[#2fbcf8] rounded-md p-[1px]">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 bg-black hover:bg-black/90 text-white h-full w-full">
                  Upgrade
                </button>
              </div>
            </a>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
