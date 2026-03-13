"use client";

import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { useCart } from "@/components/CartProvider";
import { site } from "@/config/site";

export function SiteHeader() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-surface text-brand ring-1 ring-border">
              D
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">DecoRent</div>
              <div className="text-xs text-muted">{site.city}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-2 sm:flex">
              <ButtonLink href="/catalog" variant="ghost">
                Каталог
              </ButtonLink>
              <ButtonLink href="/request" variant="secondary">
                Оставить заявку
              </ButtonLink>
            </nav>
            <ButtonLink href="/cart" variant="ghost">
              <span className="inline-flex items-center gap-2">
                <span>Список аренды</span>
                {totalItems > 0 ? (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-semibold text-white">
                    {totalItems}
                  </span>
                ) : null}
              </span>
            </ButtonLink>
          </div>
        </div>
      </Container>
    </header>
  );
}
