import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Logo } from "./logo";
import { useCafe } from "./cafe-store";

const links = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About Us" },
  { href: "#offers", label: "Offers" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const { openCart, openReserve, totalCount, cartBounce } = useCafe();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-[#D9A15B]/20 bg-[#12100E]/90 shadow-2xl backdrop-blur-xl"
          : "border-[#D9A15B]/10 bg-[#12100E]/70 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="#home" className="shrink-0 transition-transform duration-300 hover:scale-105">
          <Logo />
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 text-sm font-medium text-[#A89F91] lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors hover:text-[#D9A15B] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#D9A15B] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Cart Icon Button */}
          <button
            type="button"
            onClick={openCart}
            aria-label="View Cart"
            className={`relative grid size-11 place-items-center rounded-full border border-[#D9A15B]/25 bg-[#1C1815] text-[#F5EFE6] transition-all hover:border-[#D9A15B] hover:bg-[#26201C] active:scale-95 ${
              cartBounce ? "animate-cart-bounce" : ""
            }`}
          >
            <ShoppingBag className="size-5 text-[#D9A15B]" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#D9A15B] text-[11px] font-bold text-[#12100E] shadow-md animate-pulse">
                {totalCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={openReserve}
            className="hidden rounded-full border border-[#D9A15B]/30 bg-[#1C1815]/80 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] transition-all duration-300 hover:border-[#D9A15B] hover:bg-[#D9A15B]/15 hover:text-[#D9A15B] sm:inline-flex"
          >
            Reserve Table
          </button>

          <button
            type="button"
            onClick={openCart}
            className="rounded-full bg-[#D9A15B] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#12100E] shadow-glow transition-all duration-300 hover:scale-105 hover:bg-[#E5A958] active:scale-95"
          >
            Order Now
          </button>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-[#D9A15B]/20 bg-[#1C1815] text-[#F5EFE6] transition-colors hover:bg-[#26201C] lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-[#D9A15B]/15 bg-[#1C1815] lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-4 space-y-2 md:px-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-[#F5EFE6] transition-colors hover:bg-[#26201C] hover:text-[#D9A15B]"
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
              className="mt-2 w-full rounded-full border border-[#D9A15B]/30 bg-[#26201C] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#D9A15B] sm:hidden"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

