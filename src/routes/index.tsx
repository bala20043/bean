import { createFileRoute } from "@tanstack/react-router";
import { CafeProvider } from "@/components/cafe/cafe-store";
import { SiteNav } from "@/components/cafe/site-nav";
import { Hero } from "@/components/cafe/hero";
import { SignatureBrews } from "@/components/cafe/signature-brews";
import { MenuSection } from "@/components/cafe/menu-section";
import { AboutSection } from "@/components/cafe/about-section";
import { AmbienceSection } from "@/components/cafe/ambience-section";
import { OffersSection } from "@/components/cafe/offers-section";
import { Toaster } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <CafeProvider>
      <SiteNav />
      <main>
        <Hero />
        <SignatureBrews />
        <MenuSection />
        <AboutSection />
        <AmbienceSection />
        <OffersSection />
        <footer
          id="contact"
          className="bg-lagoon-deep py-16 text-foam md:py-20"
        >
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <h3 className="font-display text-2xl font-semibold">
                  Brew &amp; Bean
                </h3>
                <p className="mt-3 text-sm text-foam/70">
                  Good Coffee. Great Moments.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-aqua">
                  Visit Us
                </h4>
                <p className="mt-3 text-sm text-foam/80">
                  14 Marina Walk, Bandra West
                  <br />
                  Mumbai 400050
                </p>
                <p className="mt-2 text-sm text-foam/80">
                  Mon–Fri · 7:00 – 22:00
                  <br />
                  Sat–Sun · 8:00 – 23:00
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-aqua">
                  Get in Touch
                </h4>
                <p className="mt-3 text-sm text-foam/80">
                  hello@brewandbean.in
                  <br />
                  +91 98200 45678
                </p>
              </div>
            </div>
            <div className="mt-12 border-t border-foam/15 pt-6 text-center text-xs text-foam/50">
              © {new Date().getFullYear()} Brew &amp; Bean. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
      <Toaster richColors position="bottom-right" />
    </CafeProvider>
  );
}
