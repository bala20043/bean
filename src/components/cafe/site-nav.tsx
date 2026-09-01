import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { useCafe } from "./cafe-store";

const links = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About Us" },
  { href: "#offers", label: "Offers" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const { openOrder, openReserve } = useCafe();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-foam/85 backdrop-blur-md transition-all duration-300">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="#home" className="shrink-0 transition-transform duration-300 hover:scale-105">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-lagoon-deep/80 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors hover:text-lagoon after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-lagoon after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={openReserve}
            className="hidden rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-lagoon-deep transition-all duration-300 hover:border-lagoon/20 hover:bg-sand hover:text-lagoon sm:inline-flex"
          >
            Reserve a Table
          </button>
          <button
            type="button"
            onClick={() => openOrder()}
            className="rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-foam shadow-soft transition-all duration-300 hover:scale-105 hover:bg-coral/90 hover:shadow-lift active:scale-95"
          >
            Order Now
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-border text-lagoon-deep transition-colors hover:bg-sand lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-foam lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-3 md:px-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-3 text-sm font-semibold text-lagoon-deep transition-colors hover:bg-sand"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openReserve();
              }}
              className="mt-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-lagoon-deep sm:hidden"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
