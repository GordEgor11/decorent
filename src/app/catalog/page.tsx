import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ButtonLink } from "@/components/ButtonLink";

export default function CatalogPage() {
  return (
    <main className="py-14 sm:py-18">
      <Container>
        <SectionHeading
          kicker="Каталог"
          title="Каталог в разработке"
          subtitle="Следующим шагом добавим категории, карточки товаров и фильтры."
        />
        <div className="mt-8 flex gap-3">
          <ButtonLink href="/" variant="secondary">
            На главную
          </ButtonLink>
          <ButtonLink href="/request" variant="primary">
            Оставить заявку
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}

