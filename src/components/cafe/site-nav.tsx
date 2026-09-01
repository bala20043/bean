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
    <header className="sticky top-0 z-40 border-b border-border bg-foam/85 backdrop-blur-md">
      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:px-8">
        <a href="#home" className="min-w-0">
          <Logo />
        </a>

        <div className="hidden items-center gap-7 text-sm font-medium text-lagoon-deep/80 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-lagoon">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={openReserve}
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-lagoon-deep transition-colors hover:text-lagoon sm:inline-flex"
          >
            Reserve a Table
          </button>
          <button
            type="button"
            onClick={() => openOrder()}
            className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-foam shadow-soft transition hover:brightness-105"
          >
            Order Now
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-border text-lagoon-deep lg:hidden"
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
