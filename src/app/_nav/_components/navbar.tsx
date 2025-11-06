import { Routes } from "@/types/navigation";
import Auth from "@/app/auth/_components/auth";
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
    label: "Landlord",
    href: "/user/landlord"
  },
  {
    label: "Test Stuff",
    href: "/test-components",
    // devOnly: true,
  },
  {
    label: "Not Found",
    href: "/this-link-does-not-exist-for-sure",
    devOnly: true,
  },
];

export default function Navbar() {
  const visibleRoutes = routes.filter(
    (route) => !route.devOnly || process.env.NODE_ENV === "development"
  );
  return (
    <nav className="sticky flex items-center justify-between h-16 bg-card shadow-sm overflow-hidden">
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

        {visibleRoutes.map((route) => (
          <NavButton key={route.href} route={route} />
        ))}
      </div>
      <div className="flex gap-4 items-center">
        <Auth />
      </div>
    </nav>
  );
}
