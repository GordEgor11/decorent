import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ButtonLink } from "@/components/ButtonLink";

const fields = [
  { label: "Имя", name: "name", type: "text", placeholder: "Как к вам обращаться" },
  { label: "Телефон", name: "phone", type: "tel", placeholder: "+7 (___) ___‑__‑__" },
  { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
  { label: "Дата мероприятия", name: "date", type: "date" }
] as const;

export default function RequestPage() {
  return (
    <main className="py-14 sm:py-18">
      <Container>
        <SectionHeading
          kicker="Заявка"
          title="Оставьте заявку — мы подтвердим детали"
          subtitle="В MVP заявки уходят на обработку вручную (без онлайн‑оплаты). Следующим шагом подключим отправку на email/в админку."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <form className="rounded-xl border border-border bg-surface p-6 shadow-soft">
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
                <span className="text-sm font-medium">Способ получения</span>
                <select className="h-11 rounded-xl border border-border bg-bg px-3 text-sm outline-none ring-brand/40 focus:ring-2">
                  <option>Самовывоз</option>
                  <option>Доставка</option>
                </select>
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Комментарий</span>
                <textarea
                  rows={4}
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

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-medium text-white shadow-soft transition hover:bg-brand/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              >
                Отправить заявку
              </button>
            </div>
          </form>

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
      </Container>
    </main>
  );
}

