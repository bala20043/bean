import { createFileRoute } from "@tanstack/react-router";
import { CafeProvider } from "@/components/cafe/cafe-store";
import { SiteNav } from "@/components/cafe/site-nav";
import { Hero } from "@/components/cafe/hero";
import { SignatureBrews } from "@/components/cafe/signature-brews";
import { MenuSection } from "@/components/cafe/menu-section";
import { AboutSection } from "@/components/cafe/about-section";
import { AmbienceSection } from "@/components/cafe/ambience-section";
import { OffersSection } from "@/components/cafe/offers-section";
import { CartDrawer } from "@/components/cafe/cart-drawer";
import { CheckoutModal } from "@/components/cafe/checkout-modal";
import { ReservationModal } from "@/components/cafe/reservation-modal";
import { OrderHistoryModal } from "@/components/cafe/order-history-modal";
import { Toaster } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <CafeProvider>
      <div className="min-h-screen bg-[#12100E] text-[#F5EFE6]">
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
            className="bg-[#0C0A09] py-16 text-[#F5EFE6] md:py-24 border-t border-[#D9A15B]/15"
          >
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <div className="grid gap-10 md:grid-cols-3">
                <div className="space-y-3">
                  <h3 className="font-display text-2xl font-bold text-[#F5EFE6]">
                    Brew <span className="text-[#D9A15B]">&amp;</span> Bean
                  </h3>
                  <p className="text-sm text-[#A89F91]">
                    Good Coffee. Unforgettable Moments.
                  </p>
                  <p className="text-xs text-[#A89F91]/70">
                    Crafting single-origin Arabica &amp; freshly baked goods in Bandra West since 2019.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#D9A15B]">
                    Visit Us
                  </h4>
                  <p className="mt-3 text-sm text-[#F5EFE6]/90">
                    14 Marina Walk, Bandra West
                    <br />
                    Mumbai 400050
                  </p>
                  <p className="mt-2 text-xs text-[#A89F91]">
                    Mon–Fri · 7:00 – 22:00
                    <br />
                    Sat–Sun · 8:00 – 23:00
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#D9A15B]">
                    Get in Touch
                  </h4>
                  <p className="mt-3 text-sm text-[#F5EFE6]/90">
                    hello@brewandbean.in
                    <br />
                    +91 98200 45678
                  </p>
                </div>
              </div>

              <div className="mt-16 border-t border-[#D9A15B]/10 pt-6 text-center text-xs text-[#A89F91]/60">
                © {new Date().getFullYear()} Brew &amp; Bean Café. All rights reserved.
              </div>
            </div>
          </footer>
        </main>

        <CartDrawer />
        <CheckoutModal />
        <ReservationModal />
        <OrderHistoryModal />
        <Toaster richColors theme="dark" position="bottom-right" />
      </div>
    </CafeProvider>
  );
}


