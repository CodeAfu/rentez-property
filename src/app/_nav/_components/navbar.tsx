import { Routes } from "@/types/navigation";
import Auth from "@/app/_auth/_components/auth";
import NavButton from "./nav-button";
import Image from "next/image";
import Link from "next/link";

const routes: Routes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Property",
    href: "/property",
  },
  {
    label: "Not Found",
    href: "/this-link-does-not-exist-for-sure",
  },
];

export default function Navbar() {
  return (
    <nav className="sticky flex items-center justify-between h-16 bg-sidebar">
      <div className="flex h-full items-center">
        <Link href="/" className="block px-4 flex-shrink-0">
          <Image
            src="/assets/rentez-logo.svg"
            alt="logo"
            width={30}
            height={30}
            className="flex-shrink-0 w-[30px] h-[30px]"
          />
        </Link>

        {routes.map((route) => (
          <NavButton key={route.href} route={route} />
        ))}
      </div>
      <div className="flex gap-4 items-center">
        <Auth />
      </div>
    </nav>
  );
}
