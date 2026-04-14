"use client";

import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { useCart } from "@/components/CartProvider";
import { site } from "@/config/site";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
  inStock: number;
};

const demoDecorItems: DecorItem[] = [
  {
    id: "white-feathers-30",
    name: "Перья белые, 30 см",
    category: "Флористика и аксессуары",
    pricePerEvent: 35,
    color: "белые",
    size: "длина 30 см",
    description:
      "Белые декоративные перья для букетов, фотозон и акцентных композиций.",
    tags: ["флористика", "детали", "декор"],
    inStock: 100
  },
  {
    id: "candles-set-3",
    name: "Набор свечей (3 шт.)",
    category: "Подсвечники и свечи",
    pricePerEvent: 350,
    color: "айвори",
    size: "3 свечи в наборе",
    description:
      "Аккуратный набор из трёх декоративных свечей для сервировки и уютной подсветки.",
    tags: ["атмосфера", "сервировка", "детали"],
    inStock: 50
  },
  {
    id: "feather-stand-composition",
    name: "Композиция на стойке с перьями",
    category: "Композиции и стойки",
    pricePerEvent: 3500,
    color: "белые перья + нейтральные оттенки",
    size: "стойка с композицией",
    description:
      "Акцентная композиция на стойке с перьями для оформления зоны церемонии или фотозоны.",
    tags: ["акцент", "фотозона", "церемония"],
    inStock: 10
  },
  {
    id: "green-napkins",
    name: "Салфетки зелёные",
    category: "Сервировка",
    pricePerEvent: 120,
    color: "зелёные",
    size: "стандартный размер",
    description:
      "Зелёные салфетки для сервировки столов и оформления композиций.",
    tags: ["сервировка", "текстиль", "детали"],
    inStock: 100
  },
  {
    id: "napkin-rings",
    name: "Кольца для салфеток",
    category: "Сервировка",
    pricePerEvent: 100,
    color: "нейтральный металл",
    size: "стандартный размер",
    description:
      "Кольца для салфеток, чтобы аккуратно собрать сервировку и добавить акцент.",
    tags: ["сервировка", "детали"],
    inStock: 100
  },
  {
    id: "disco-ball-40",
    name: "Диско-шар 40 см",
    category: "Декор пространства",
    pricePerEvent: 1700,
    color: "зеркальная мозаика",
    size: "диаметр 40 см",
    description:
      "Большой диско-шар для эффектного света и акцента в зале или на фотозоне.",
    tags: ["свет", "вечеринка", "фотозона"],
    inStock: 5
  }
];

const priceRanges = [
  { id: "all", label: "Любая стоимость", min: null, max: null },
  { id: "0-3000", label: "до 3 000 ₽", min: 0, max: 3000 },
  { id: "3000-6000", label: "3 000–6 000 ₽", min: 3000, max: 6000 },
  { id: "6000-10000", label: "6 000–10 000 ₽", min: 6000, max: 10000 },
  { id: "10000+", label: "от 10 000 ₽", min: 10000, max: null }
] as const;

type PriceRangeId = (typeof priceRanges)[number]["id"];

function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price);
}

function isPriceRangeId(value: string): value is PriceRangeId {
  return priceRanges.some((range) => range.id === value);
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const { addItem, items, totalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState<PriceRangeId>(
    priceRanges[0].id
  );

  const quantityById = useMemo(
    () => new Map(items.map((item) => [item.id, item.quantity])),
    [items]
  );

  const categories = useMemo(() => {
    const unique = new Set(demoDecorItems.map((item) => item.category));
    return ["all", ...Array.from(unique).sort()];
  }, []);

  useEffect(() => {
    const requested = searchParams.get("category");
    if (!requested) {
      setSelectedCategory("all");
      return;
    }
    if (categories.includes(requested)) {
      setSelectedCategory(requested);
    }
  }, [searchParams, categories]);

  const filteredItems = useMemo(() => {
    const range = priceRanges.find((r) => r.id === selectedPrice) ?? priceRanges[0];
    return demoDecorItems.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (range.min !== null && item.pricePerEvent < range.min) {
        return false;
      }
      if (range.max !== null && item.pricePerEvent > range.max) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedPrice]);

  return (
    <main className="py-14 sm:py-18">
      <Container>
        <SectionHeading
          kicker="Каталог"
          title="Подберите декор под ваше мероприятие"
          subtitle={`В каталоге собраны позиции, которые доступны для заказа в ${site.city}. Выберите нужные детали и добавьте их в список.`}
        />

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-text shadow-soft transition hover:bg-bg"
          >
            <span aria-hidden="true">←</span>
            <span>На главную</span>
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted">
          <p>
            На этом шаге вы можете собрать ориентировочный список аренды. Цена
            указана за единицу, финальные условия обсудим после заявки.
          </p>
          <Link
            href="/cart"
            className="hidden shrink-0 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text shadow-soft transition hover:bg-bg sm:inline-flex sm:items-center sm:gap-2"
          >
            <span>Список аренды</span>
            {totalItems > 0 ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand text-[11px] font-semibold text-white">
                {totalItems}
              </span>
            ) : null}
          </Link>
        </div>

        <div className="mt-8 grid gap-4 rounded-xl border border-border bg-surface p-4 text-xs text-muted shadow-soft sm:grid-cols-[1.1fr_1.1fr_auto] sm:items-end sm:gap-6 sm:p-5">
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-wide">Категория</span>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="h-11 rounded-xl border border-border bg-bg px-3 text-sm text-text outline-none ring-brand/40 focus:ring-2"
            >
              <option value="all">Все категории</option>
              {categories
                .filter((category) => category !== "all")
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-wide">
              Стоимость аренды
            </span>
            <select
              value={selectedPrice}
              onChange={(event) => {
                if (isPriceRangeId(event.target.value)) {
                  setSelectedPrice(event.target.value);
                }
              }}
              className="h-11 rounded-xl border border-border bg-bg px-3 text-sm text-text outline-none ring-brand/40 focus:ring-2"
            >
              {priceRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <div className="text-[11px] uppercase tracking-wide text-muted">
              Найдено: {filteredItems.length}
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedPrice(priceRanges[0].id);
              }}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-bg px-4 text-xs font-medium text-muted transition hover:bg-surface/70"
            >
              Сбросить фильтры
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
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
                      Стоимость
                    </div>
                    <div className="mt-0.5 text-sm font-semibold">
                      {formatPrice(item.pricePerEvent)} ₽ за штуку
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
                  <span className="text-[11px]">В наличии: {item.inStock} шт.</span>
                </div>

                {quantityById.get(item.id) ? (
                  <div className="text-xs font-medium text-text">
                    В корзине: {quantityById.get(item.id)} шт.
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      id: item.id,
                      name: item.name,
                      pricePerEvent: item.pricePerEvent
                    })
                  }
                  className="mt-4 inline-flex h-11 items-center justify-center rounded-xl border border-dashed border-border bg-bg/60 px-4 text-sm font-medium text-muted transition group-hover:border-brand/40 group-hover:text-text"
                >
                  Добавить в список аренды
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="mt-6 rounded-xl border border-border bg-surface p-5 text-sm text-muted shadow-soft">
            По выбранным фильтрам нет позиций. Попробуйте изменить категорию
            или диапазон стоимости.
          </div>
        ) : null}

        {totalItems > 0 ? (
          <div className="pointer-events-none fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6">
            <div className="pointer-events-auto ml-auto w-fit">
              <ButtonLink
                href="/request"
                variant="secondary"
                className="h-10 rounded-full px-4 py-0 text-xs font-medium shadow-soft"
              >
                Перейти к оформлению
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </Container>
    </main>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<main className="py-14 sm:py-18" />}>
      <CatalogContent />
    </Suspense>
  );
}
