import Container from "../Container/Container";

export default function Section({
  id,
  children,
  className = "",
}) {
  return (
    <section
      id={id}
      className={`
      relative
      py-24
      md:py-32
      overflow-hidden
      ${className}
      `}
    >
      <Container>{children}</Container>
    </section>
  );
}