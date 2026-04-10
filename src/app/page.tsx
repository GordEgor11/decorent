import { ButtonLink } from "@/components/ButtonLink";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/config/site";

const advantages = [
  {
    title: "Красиво и без лишних покупок",
    text: "Берёте декор на мероприятие, а после просто возвращаете — без хранения и лишних трат."
  },
  {
    title: "Прозрачные цены",
    text: "В каталоге сразу видна ориентировочная стоимость, а детали залога и правил мы спокойно обсуждаем после заявки."
  },
  {
    title: "Помогаем с подбором",
    text: "Подскажем, как собрать цельный набор: цвета, фактуры, сочетания и нужное количество."
  }
];

const steps = [
  {
    title: "Выберите декор",
    text: "Посмотрите каталог и отметьте то, что нравится — всё окажется в вашем списке."
  },
  {
    title: "Укажите дату",
    text: "Дата нужна, чтобы мы сразу проверили наличие и не теряли время."
  },
  {
    title: "Оставьте заявку",
    text: "Оставьте контакты и выберите удобный вариант получения."
  },
  {
    title: "Подтвердим и поможем",
    text: "Свяжемся, уточним нюансы и подтвердим стоимость и доступность."
  }
];

const categories = [
  {
    id: "Флористика и аксессуары",
    title: "Флористика и аксессуары",
    text: "Перья, декоративные детали и небольшие акценты"
  },
  {
    id: "Подсвечники и свечи",
    title: "Подсвечники и свечи",
    text: "Тёплый свет и мягкая атмосфера для сервировки"
  },
  {
    id: "Композиции и стойки",
    title: "Композиции и стойки",
    text: "Акцентные элементы для церемонии и фотозоны"
  },
  {
    id: "Сервировка",
    title: "Сервировка",
    text: "Салфетки, кольца и детали для стола"
  },
  {
    id: "Декор пространства",
    title: "Декор пространства",
    text: "Крупные акценты и эффектные элементы зала"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-dvh">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand2/8 blur-3xl" />
          </div>

          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted shadow-soft">
                  <span className="size-1.5 rounded-full bg-brand" />
                  Аренда декора для мероприятий • {site.city}
                </div>
                <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                  Красивое оформление — без лишних покупок и хлопот
                </h1>
                <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg">
                  Вы выбираете декор, мы берём на себя всё остальное: проверим
                  наличие на вашу дату и поможем собрать гармоничный набор.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/catalog" variant="primary">
                    Посмотреть каталог
                  </ButtonLink>
                  <ButtonLink href="/request" variant="secondary">
                    Оставить заявку
                  </ButtonLink>
                </div>

                <div className="mt-6 text-xs leading-5 text-muted">
                  Сейчас без онлайн‑оплаты: все детали, залог и доставку
                  подтверждаем после заявки.
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface p-5 shadow-soft sm:p-6">
                <div className="aspect-[4/3] w-full rounded-xl border border-border bg-[linear-gradient(135deg,rgb(var(--brand)/0.14),rgb(var(--brand2)/0.10))]" />
                <div className="mt-5 grid gap-3">
                  <div className="text-sm font-semibold">
                    Быстрый подбор под вашу дату
                  </div>
                  <ul className="grid gap-2 text-sm text-muted">
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                      Проверим наличие и предложим варианты
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                      Подскажем по количеству и сочетаниям
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                      Самовывоз или доставка — как вам удобнее
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Advantages */}
        <section className="py-14 sm:py-18">
          <Container>
            <SectionHeading
              kicker="Почему удобно"
              title="Аренда без лишней суеты"
              subtitle="Процесс простой: выбрать → оставить заявку → подтвердить детали."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {advantages.map((a) => (
                <div
                  key={a.title}
                  className="rounded-xl border border-border bg-surface p-5 shadow-soft"
                >
                  <div className="text-base font-semibold">{a.title}</div>
                  <p className="mt-2 text-sm leading-6 text-muted">{a.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* How it works */}
        <section className="py-14 sm:py-18">
          <Container>
            <SectionHeading
              kicker="Как это работает"
              title="Всего несколько шагов"
              subtitle="Вы оставляете заявку, мы быстро подтверждаем наличие и финальную стоимость."
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {steps.map((s, idx) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-border bg-surface p-5 shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{s.title}</div>
                    <div className="grid size-9 place-items-center rounded-xl bg-bg text-xs font-semibold text-brand2 ring-1 ring-border">
                      {idx + 1}
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/catalog" variant="primary">
                Перейти в каталог
              </ButtonLink>
              <ButtonLink href="/request" variant="ghost">
                Оформить заявку
              </ButtonLink>
            </div>
          </Container>
        </section>

        {/* Categories */}
        <section className="py-14 sm:py-18">
          <Container>
            <SectionHeading
              kicker="Категории"
              title="Соберите комплект под ваш стиль"
              subtitle="Подходит и для классики, и для минимализма, и для более смелых тем. Начните с категории."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {categories.map((c) => (
                <Link
                  key={c.title}
                  href={`/catalog?category=${encodeURIComponent(c.id)}`}
                  className="group rounded-xl border border-border bg-surface p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.10)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold">{c.title}</div>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {c.text}
                      </p>
                    </div>
                    <div className="grid size-11 place-items-center rounded-xl bg-bg text-brand ring-1 ring-border transition group-hover:bg-brand/10">
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16">
          <Container>
            <div className="rounded-xl border border-border bg-[linear-gradient(135deg,rgb(var(--brand)/0.12),rgb(var(--brand2)/0.08))] p-8 shadow-soft sm:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Готовы начать?
                  </div>
                  <div className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                    Соберите список аренды и оставьте заявку
                  </div>
                  <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-muted sm:text-base">
                    Мы уточним детали, проверим наличие и подскажем удобный вариант
                    получения.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <ButtonLink href="/request" variant="primary">
                    Оставить заявку
                  </ButtonLink>
                  <ButtonLink href="/catalog" variant="secondary">
                    Сначала каталог
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-border/70 py-10">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-sm font-semibold">{site.name}</div>
              <div className="mt-2 text-sm text-muted">{site.city}</div>
              <div className="mt-4 text-xs text-muted">
                © {new Date().getFullYear()} • Аренда декора для мероприятий
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Навигация</div>
              <div className="mt-3 grid gap-2 text-sm text-muted">
                <a className="hover:text-text" href="/catalog">
                  Каталог
                </a>
                <a className="hover:text-text" href="/request">
                  Оставить заявку
                </a>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Контакты</div>
              <div className="mt-3 grid gap-2 text-sm text-muted">
                <div>Телефон: {site.contacts.phone}</div>
                <div>Email: {site.contacts.email}</div>
                <div>Telegram: @{site.contacts.telegram}</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Важно</div>
              <div className="mt-3 text-sm leading-6 text-muted">
                Оплата и залог подтверждаются после заявки. Доставка обсуждается
                индивидуально.
              </div>
            </div>
          </div>
        </Conчtainer>
      </footer>
    </div>
  );
}
