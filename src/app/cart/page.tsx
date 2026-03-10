 "use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ButtonLink } from "@/components/ButtonLink";
import { useCart } from "@/components/CartProvider";

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export default function CartPage() {
  const { items, totalAmount, totalItems, increaseQuantity, decreaseQuantity, removeItem, clear } =
    useCart();

  const hasItems = items.length > 0;

  return (
    <main className="py-14 sm:py-18">
      <Container>
        <SectionHeading
          kicker="Список аренды"
          title="Предметы, которые вы хотите забронировать"
          subtitle={
            hasItems
              ? "Это черновой список аренды. На следующем шаге вы укажете дату мероприятия, контакты и способ получения, а мы вручную подтвердим наличие и условия."
              : "Пока что список аренды пуст. Добавьте позиции из каталога, а затем вернитесь сюда, чтобы отправить заявку."
          }
        />

        {!hasItems ? (
          <div className="mt-10 flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 text-sm text-muted shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <p>
              Вы ещё не выбрали ни одной позиции. Начните с каталога — добавьте
              арки, текстиль, подсвечники и другие элементы, которые хотите
              использовать на мероприятии.
            </p>
            <div className="flex gap-3">
              <ButtonLink href="/catalog" variant="primary">
                Перейти в каталог
              </ButtonLink>
              <ButtonLink href="/" variant="ghost">
                На главную
              </ButtonLink>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
              <section className="space-y-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-4 rounded-xl border border-border bg-surface p-4 shadow-soft sm:gap-5 sm:p-5"
                  >
                    <div className="hidden aspect-[4/3] w-32 rounded-lg bg-[radial-gradient(circle_at_top_left,rgb(var(--brand)/0.20),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--brand2)/0.18),transparent_55%)] sm:block" />
                    <div className="flex flex-1 flex-col gap-2">
                      <header className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold leading-snug">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-xs text-muted">
                            Ориентировочная цена за мероприятие:{" "}
                            <span className="font-semibold text-text">
                              {formatPrice(item.pricePerEvent)} ₽
                            </span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-muted underline-offset-2 hover:text-text hover:underline"
                        >
                          Удалить
                        </button>
                      </header>

                      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-2 py-1 text-xs text-muted">
                          <span className="text-[11px] uppercase tracking-wide">
                            Количество
                          </span>
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="grid h-6 w-6 place-items-center rounded-full border border-border bg-surface text-xs text-text hover:bg-bg"
                            >
                              −
                            </button>
                            <span className="min-w-6 text-center text-xs font-medium text-text">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="grid h-6 w-6 place-items-center rounded-full border border-border bg-surface text-xs text-text hover:bg-bg"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="text-right text-xs">
                          <div className="text-muted">Ориентировочная сумма</div>
                          <div className="mt-0.5 text-sm font-semibold text-text">
                            {formatPrice(item.pricePerEvent * item.quantity)} ₽
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </section>

              <aside className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-soft">
                <div>
                  <div className="text-sm font-semibold">Итого по списку аренды</div>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Это ориентировочная стоимость аренды по выбранным позициям без
                    учёта залога и доставки. Финальные условия мы подтвердим после
                    вашей заявки.
                  </p>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-xs text-muted">
                    Позиции:{" "}
                    <span className="font-semibold text-text">
                      {items.length}
                    </span>
                    <br />
                    Предметов всего:{" "}
                    <span className="font-semibold text-text">
                      {totalItems}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-wide text-muted">
                      Ориентировочная сумма
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {formatPrice(totalAmount)} ₽
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs leading-5 text-muted">
                  <p>
                    На следующем шаге вы укажете дату мероприятия, способ
                    получения (самовывоз или доставка) и контакты — на основе этих
                    данных мы подтвердим наличие и обсудим залог и логистику.
                  </p>
                  <p>
                    В рамках MVP заявка отправляется без онлайн‑оплаты. Все детали
                    вы обсудите с нами вручную.
                  </p>
                </div>

                <div className="mt-2 flex flex-col gap-3">
                  <ButtonLink href="/request" variant="primary">
                    Перейти к оформлению заявки
                  </ButtonLink>
                  <ButtonLink href="/catalog" variant="secondary">
                    Вернуться в каталог
                  </ButtonLink>
                  <button
                    type="button"
                    onClick={clear}
                    className="mt-1 self-start text-xs text-muted underline-offset-2 hover:text-text hover:underline"
                  >
                    Очистить список аренды
                  </button>
                </div>
              </aside>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}

