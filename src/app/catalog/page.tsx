import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/config/site";

type DecorItem = {
  id: string;
  name: string;
  category: string;
  pricePerEvent: number;
  depositFrom?: number;
  color: string;
  size: string;
  description: string;
  tags: string[];
  note?: string;
};

const demoDecorItems: DecorItem[] = [
  {
    id: "arch-minimal",
    name: "Минималистичная напольная арка",
    category: "Арки и фон",
    pricePerEvent: 8500,
    depositFrom: 15000,
    color: "матовое белое покрытие",
    size: "около 2,3 м по высоте",
    description:
      "Лаконичная металлическая арка для выездной регистрации и фотозоны. Подходит под минимализм, классику и modern.",
    tags: ["выездная регистрация", "фон для церемонии", "минимализм"],
    note: "Идеальна в паре с текстилем и напольными вазами."
  },
  {
    id: "glass-vases-set",
    name: "Набор стеклянных ваз разной высоты",
    category: "Посуда и вазы",
    pricePerEvent: 3200,
    depositFrom: 6000,
    color: "прозрачное стекло",
    size: "6 ваз от 12 до 35 см",
    description:
      "Набор цилиндрических ваз для композиций и свечей. Выглядит аккуратно и не спорит с цветами.",
    tags: ["столы гостей", "sweet table", "універсальный"],
    note: "Можно использовать как под цветы, так и под плавающие свечи."
  },
  {
    id: "candlesticks-gold",
    name: "Тонкие подсвечники под свечи-таперы",
    category: "Подсвечники и свечи",
    pricePerEvent: 2700,
    depositFrom: 5000,
    color: "золотистый металл",
    size: "на свечи диаметром 2–2,2 см",
    description:
      "Легкие металлические подсвечники разной высоты для уютного теплого света на столах.",
    tags: ["атмосфера", "вечер", "классика"],
    note: "Лучше всего смотрятся группами по 3–5 штук."
  },
  {
    id: "textile-table-runner",
    name: "Текстильный раннер на стол",
    category: "Текстиль",
    pricePerEvent: 1800,
    color: "теплый айвори",
    size: "длина ~3 м, мягкие спуски",
    description:
      "Полупрозрачный текстильный раннер с мягкой драпировкой. Добавляет объём и фактуру сервировке.",
    tags: ["столы гостей", "главный стол", "rustic"],
    note: "Сочетается с натуральным деревом и прозрачным стеклом."
  },
  {
    id: "numbers-acrylic",
    name: "Номера столов из прозрачного акрила",
    category: "Номера и таблички",
    pricePerEvent: 1500,
    depositFrom: 3000,
    color: "прозрачный акрил + белый шрифт",
    size: "формат примерно 10×15 см",
    description:
      "Номера столов в минималистичном стиле. Помогают гостям быстро найти свой стол и не перегружают сервировку.",
    tags: ["организация", "минимализм"],
    note: "Подходят к современным и классическим сервировкам."
  },
  {
    id: "lanterns-floor",
    name: "Напольные фонари со стеклом",
    category: "Декор пространства",
    pricePerEvent: 3900,
    depositFrom: 7000,
    color: "натуральное дерево + прозрачное стекло",
    size: "набор из 3 фонарей разной высоты",
    description:
      "Объёмные фонари для оформления входа, дорожек и зон отдыха. Можно использовать со свечами или гирляндами.",
    tags: ["вечерняя подсветка", "уличная церемония"],
    note: "Хорошо работают в связке с текстилем и зеленью."
  }
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price);
}

export default function CatalogPage() {
  return (
    <main className="py-14 sm:py-18">
      <Container>
        <SectionHeading
          kicker="Каталог"
          title="Подберите декор под ваше мероприятие"
          subtitle={`Здесь будут реальные позиции из ассортимента: арки, текстиль, подсвечники, вазы и другие элементы. Пока что показываем тестовые карточки, чтобы продумать структуру и вёрстку каталога для ${site.city}.`}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demoDecorItems.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(0,0,0,0.10)]"
            >
              <div className="relative aspect-[4/3] bg-[radial-gradient(circle_at_top_left,rgb(var(--brand)/0.20),transparent_55%),radial-gradient(circle_at_bottom_right,rgb(var(--brand2)/0.18),transparent_55%)]">
                <div className="absolute inset-3 rounded-[0.9rem] border border-white/40 bg-gradient-to-br from-white/55 via-white/20 to-white/5 backdrop-blur-sm" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-muted ring-1 ring-border/70">
                  <span className="size-1.5 rounded-full bg-brand" />
                  {item.category}
                </div>
                {item.tags.length > 0 ? (
                  <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 text-[11px] text-muted">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-bg/80 px-2 py-0.5 ring-1 ring-border/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="text-base font-semibold leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </div>

                <dl className="grid gap-1 text-xs text-muted">
                  <div className="flex gap-1.5">
                    <dt className="font-medium text-text">Цвет / материал:</dt>
                    <dd>{item.color}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="font-medium text-text">Размер:</dt>
                    <dd>{item.size}</dd>
                  </div>
                </dl>

                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted">
                      Ориентировочная аренда
                    </div>
                    <div className="mt-0.5 text-sm font-semibold">
                      от {formatPrice(item.pricePerEvent)} ₽ за мероприятие
                    </div>
                    {item.depositFrom ? (
                      <div className="mt-0.5 text-[11px] text-muted">
                        Возможен залог от {formatPrice(item.depositFrom)} ₽ —
                        детали уточняем в заявке.
                      </div>
                    ) : null}
                  </div>
                </div>

                {item.note ? (
                  <p className="mt-1 text-[11px] leading-5 text-muted">
                    {item.note}
                  </p>
                ) : null}

                <div className="mt-3 flex justify-between gap-3 text-xs text-muted">
                  <span>Дата и количество будут выбраны позже.</span>
                  <span className="hidden text-[11px] sm:inline">
                    В MVP список аренды и фильтры добавим отдельным шагом.
                  </span>
                </div>

                <button
                  type="button"
                  disabled
                  className="mt-4 inline-flex h-11 items-center justify-center rounded-xl border border-dashed border-border bg-bg/60 px-4 text-sm font-medium text-muted transition group-hover:border-brand/40 group-hover:text-text"
                >
                  Добавить в список аренды (скоро)
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-6 text-muted">
          Сейчас вы видите демонстрационные карточки. На следующих шагах мы
          подключим реальные данные из базы, фильтры по категориям и полноценный
          &quot;список аренды&quot; с выбором даты мероприятия.
        </p>
      </Container>
    </main>
  );
}

