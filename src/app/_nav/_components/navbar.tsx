import { Routes } from "@/types/navigation";
import Auth from "@/app/auth/_components/auth";
import NavButton from "./nav-button";
import Link from "next/link";
import { Particles } from "@/components/ui/particles";

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
    label: "Settings",
    href: "/user/settings",
  },
  {
    label: "Test",
    href: "/test-components",
    devOnly: true,
  },
  {
    label: "Not Found",
    href: "/this-link-does-not-exist-for-sure",
    devOnly: true,
  },
];

export default function Navbar() {
  const visibleRoutes = routes.filter(
    (route) => !route.devOnly || process.env.NODE_ENV === "development",
  );

  return (
    <nav className="sticky relative flex items-center justify-between h-16 bg-card/70 backdrop-blur-sm shadow-sm overflow-hidden">
      {/* Navbar-only background particles (non-interactive, behind content) */}
      <Particles
        className="absolute inset-0 -z-10 pointer-events-none"
        color="muted"
        quantity={40}
        size={0.6}
        vx={0.1}
        vy={0.1}
      />

      <div className="flex h-full items-center">
        <Link href="/" className="block mx-4 w-[30px] h-[30px]">
          <img
            src="/assets/rentez-logo.svg"
            alt="logo"
            width={30}
            height={30}
            // ensure the image fills the container
            className="w-full h-full object-contain"
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
