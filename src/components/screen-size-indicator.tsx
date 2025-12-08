export default function ScreenSizeIndicator() {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div className="fixed right-5 bottom-5 z-50 px-2 flex h-9 select-none items-center justify-center rounded shadow-lg opacity-50 bg-accent text-xs font-mono font-semibold text-accent-foreground hover:opacity-100 transition duration-200">
      <span className="sm:hidden pointer-events-none">xs</span>
      <span className="hidden sm:inline md:hidden pointer-events-none">sm</span>
      <span className="hidden md:inline lg:hidden pointer-events-none">md</span>
      <span className="hidden lg:inline xl:hidden pointer-events-none">lg</span>
      <span className="hidden xl:inline 2xl:hidden pointer-events-none">xl</span>
      <span className="hidden 2xl:inline pointer-events-none">2xl</span>
    </div>
  );
}
