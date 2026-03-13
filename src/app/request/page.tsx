 "use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ButtonLink } from "@/components/ButtonLink";
import { useCart } from "@/components/CartProvider";

const fields = [
  { label: "Имя", name: "name", type: "text", placeholder: "Как к вам обращаться" },
  { label: "Телефон", name: "phone", type: "tel", placeholder: "+7 (___) ___‑__‑__" },
  { label: "Telegram", name: "telegram", type: "text", placeholder: "@username" }
] as const;

const DELIVERY_FEE = 2000;

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export default function RequestPage() {
  const { items, totalAmount, totalItems } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );

  const deliveryFee = deliveryMethod === "delivery" ? DELIVERY_FEE : 0;
  const estimatedTotal = totalAmount + deliveryFee;
  const summaryItems = useMemo(() => items.slice(0, 4), [items]);
  const remainingItems = items.length - summaryItems.length;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      telegram: String(formData.get("telegram") ?? "").trim(),
      eventStart: String(formData.get("date_start") ?? "").trim(),
      eventEnd: String(formData.get("date_end") ?? "").trim(),
      deliveryMethod: deliveryMethod,
      comment: String(formData.get("comment") ?? "").trim(),
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        pricePerEvent: item.pricePerEvent
      })),
      totalItems,
      totalAmount: estimatedTotal
    };

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Не удалось отправить заявку");
      }

      setStatus("success");
      form.reset();
      setDeliveryMethod("pickup");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Не удалось отправить заявку"
      );
    }
  }

  return (
    <main className="py-14 sm:py-18">
      <Container>
        <SectionHeading
          kicker="Заявка"
          title="Оставьте заявку — мы подтвердим детали"
          subtitle="В MVP заявки уходят на обработку вручную (без онлайн‑оплаты). Следующим шагом подключим отправку в админку."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-surface p-6 shadow-soft"
          >
            <div className="grid gap-4">
              {fields.map((f) => (
                <label key={f.name} className="grid gap-1.5">
                  <span className="text-sm font-medium">{f.label}</span>
                  <input
                    name={f.name}
                    type={f.type}
                    placeholder={"placeholder" in f ? f.placeholder : undefined}
                    className="h-11 rounded-xl border border-border bg-bg px-3 text-sm outline-none ring-brand/40 focus:ring-2"
                  />
                </label>
              ))}

              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Период мероприятия</span>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1 text-xs text-muted">
                    <span>Начало</span>
                    <input
                      name="date_start"
                      type="date"
                      className="h-11 rounded-xl border border-border bg-bg px-3 text-sm text-text outline-none ring-brand/40 focus:ring-2"
                    />
                  </label>
                  <label className="grid gap-1 text-xs text-muted">
                    <span>Окончание</span>
                    <input
                      name="date_end"
                      type="date"
                      className="h-11 rounded-xl border border-border bg-bg px-3 text-sm text-text outline-none ring-brand/40 focus:ring-2"
                    />
                  </label>
                </div>
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Способ получения</span>
                <select
                  name="delivery_method"
                  value={deliveryMethod}
                  onChange={(event) =>
                    setDeliveryMethod(
                      event.target.value === "delivery" ? "delivery" : "pickup"
                    )
                  }
                  className="h-11 rounded-xl border border-border bg-bg px-3 text-sm outline-none ring-brand/40 focus:ring-2"
                >
                  <option value="pickup">Самовывоз</option>
                  <option value="delivery">Доставка</option>
                </select>
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Комментарий</span>
                <textarea
                  rows={4}
                  name="comment"
                  className="rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none ring-brand/40 focus:ring-2"
                  placeholder="Стиль, площадка, пожелания по цветам и количеству…"
                />
              </label>

              <label className="flex items-start gap-3 rounded-xl border border-border bg-bg p-4 text-sm text-muted">
                <input type="checkbox" className="mt-0.5 size-4" />
                <span>
                  Согласен(на) с правилами аренды (добавим отдельную страницу
                  правил на следующем шаге).
                </span>
              </label>

              <div className="sticky bottom-4 z-10 mt-2 grid gap-2 rounded-xl border border-border bg-surface/95 p-4 backdrop-blur sm:static sm:mt-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{ backgroundColor: "rgb(var(--brand, 177 104 86))" }}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-medium text-white shadow-soft transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "loading" ? "Отправляем..." : "Отправить заявку"}
                </button>
                {status === "success" ? (
                  <p className="text-xs text-emerald-600">
                    Заявка отправлена. Мы свяжемся с вами в ближайшее время.
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="text-xs text-red-600">{errorMessage}</p>
                ) : null}
              </div>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-soft">
              <div className="text-sm font-semibold">Сводка заявки</div>
              {items.length === 0 ? (
                <p className="mt-2 text-sm text-muted">
                  Пока что вы не выбрали позиции. Вернитесь в каталог и добавьте
                  декор, чтобы увидеть ориентировочную стоимость.
                </p>
              ) : (
                <>
                  <ul className="mt-3 grid gap-2 text-sm text-muted">
                    {summaryItems.map((item) => (
                      <li key={item.id} className="flex items-start justify-between">
                        <span className="max-w-[70%] text-text">
                          {item.name}
                        </span>
                        <span className="text-xs text-muted">
                          ×{item.quantity}
                        </span>
                      </li>
                    ))}
                    {remainingItems > 0 ? (
                      <li className="text-xs text-muted">
                        и ещё {remainingItems} поз.
                      </li>
                    ) : null}
                  </ul>

                  <div className="mt-4 space-y-2 text-xs text-muted">
                    <div className="flex items-center justify-between">
                      <span>Позиции всего</span>
                      <span className="font-semibold text-text">{totalItems}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ориентировочная сумма</span>
                      <span className="font-semibold text-text">
                        {formatPrice(totalAmount)} ₽
                      </span>
                    </div>
                    {deliveryMethod === "delivery" ? (
                      <div className="flex items-center justify-between">
                        <span>Доставка (надбавка)</span>
                        <span className="font-semibold text-text">
                          +{formatPrice(deliveryFee)} ₽
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span>Самовывоз</span>
                        <span className="font-semibold text-text">0 ₽</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t border-border pt-2 text-sm text-text">
                      <span className="font-semibold">Итого ориентировочно</span>
                      <span className="font-semibold">
                        {formatPrice(estimatedTotal)} ₽
                      </span>
                    </div>
                    <p className="text-[11px] leading-5 text-muted">
                      Итог включает выбранный способ получения. Финальные условия
                      подтверждаем после заявки.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="rounded-xl border border-border bg-surface p-6 shadow-soft">
              <div className="text-sm font-semibold">Что будет дальше</div>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
                <li>1) Мы свяжемся и уточним детали</li>
                <li>2) Проверим наличие на дату</li>
                <li>3) Согласуем залог/доставку/самовывоз</li>
                <li>4) Подтвердим бронь</li>
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/catalog" variant="secondary">
                  Сначала каталог
                </ButtonLink>
                <ButtonLink href="/" variant="ghost">
                  На главную
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
