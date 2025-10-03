import { Routes } from "@/types/navigation";
import Auth from "@/app/_auth/_components/auth";
import NavButton from "./nav-button";

const routes: Routes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Property",
    href: "/property",
  },
];

export default function Navbar() {
  return (
    <nav className="sticky flex items-center justify-between h-16 bg-sidebar">
      <div className="flex h-full items-center">
        <div className="px-4 text-sm">RentEZ Property</div>
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
