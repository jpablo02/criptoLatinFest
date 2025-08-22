import Link from "next/link";
import { Button } from "./button";
//components

import Nav from "./Nav";


const Header = () => {
  return (
    <section>
      <header className="py-4 xl:py-6  relative z-40">
        <div className="container mx-auto flex justify-between  items-center">
          {/*logo*/}
          <Link href="/">
  <div className="flex items-center">
    <img
      src="https://bafybeicfsv7bdfnrrysqkmjqxbsqenpngmcariwbybzjf2orttf5vjxtvi.ipfs.dweb.link/"
      className="w-24 h-auto transition-transform duration-300 ease-in-out hover:scale-110 relative"
      alt="Logo"
    />
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 hover:opacity-80 rounded-lg pointer-events-none"></div>
  </div>
</Link>


          {/*dektop nav*/}
          <div className="hidden xl:flex items-center gap-8">
            <Nav />
          </div>
         
        </div>
      </header>
    </section>
  );
};

export default Header;
