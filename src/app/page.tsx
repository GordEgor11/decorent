import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/config/site";

const advantages = [
  {
    title: "Красиво и без лишних покупок",
    text: "Берите декор в аренду на событие и не думайте, куда его деть потом."
  },
  {
    title: "Понятные цены и условия",
    text: "В каталоге — ориентировочная стоимость аренды, нюансы залога и правила."
  },
  {
    title: "Подбор под стиль",
    text: "Поможем собрать цельный набор: оттенки, фактуры, сочетания и количество."
  }
];

const steps = [
  {
    title: "Выберите декор",
    text: "Посмотрите каталог и добавьте понравившиеся позиции в список аренды."
  },
  {
    title: "Укажите дату",
    text: "Сразу отметьте дату мероприятия — так мы быстрее проверим наличие."
  },
  {
    title: "Оставьте заявку",
    text: "Заполните контакты и способ получения (самовывоз или доставка)."
  },
  {
    title: "Мы подтвердим детали",
    text: "Свяжемся, уточним нюансы и финально подтвердим стоимость и доступность."
  }
];

const categories = [
  { title: "Арки и фон", text: "Конструкции, стойки, элементы оформления" },
  { title: "Текстиль", text: "Скатерти, дорожки, салфетки, чехлы" },
  { title: "Подсвечники и свечи", text: "Теплый свет для атмосферы" },
  { title: "Посуда и вазы", text: "Стекло, керамика, формы под композиции" }
];

export default function HomePage() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-xl bg-surface text-brand ring-1 ring-border">
                D
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">DecoRent</div>
                <div className="text-xs text-muted">{site.city}</div>
              </div>
            </div>
            <nav className="hidden items-center gap-2 sm:flex">
              <ButtonLink href="/catalog" variant="ghost">
                Каталог
              </ButtonLink>
              <ButtonLink href="/request" variant="secondary">
                Оставить заявку
              </ButtonLink>
            </nav>
          </div>
        </Container>
      </header>

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
                  Красивое оформление — без покупок и суеты
                </h1>
                <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg">
                  Выбирайте декор в каталоге, добавляйте в список аренды и
                  отправляйте заявку. Мы подтвердим наличие на вашу дату и
                  поможем собрать цельный набор под стиль мероприятия.
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
                  В MVP без онлайн‑оплаты: детали, залог и доставка подтверждаем
                  вручную после заявки.
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
                      Проверим наличие и предложим альтернативы
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                      Подскажем по количеству и сочетаниям
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                      Самовывоз или доставка по договоренности
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
              title="Сервис аренды, который экономит время"
              subtitle="На старте мы делаем упор на понятный процесс: выбрать → оставить заявку → подтвердить детали."
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
              title="4 шага — и декор забронирован в работе"
              subtitle="Вы оставляете заявку на сайте, а подтверждение наличия и финальный расчёт мы делаем вручную — быстро и прозрачно."
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
              subtitle="Набор позиций можно подобрать под классику, минимализм, rustic и другие стили — начните с категории."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {categories.map((c) => (
                <div
                  key={c.title}
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
                </div>
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
                    Соберите список аренды и отправьте заявку
                  </div>
                  <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-muted sm:text-base">
                    Мы уточним детали, проверим наличие на дату мероприятия и
                    предложим лучшее решение по логистике.
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
        </Container>
      </footer>
    </div>
  );
}

