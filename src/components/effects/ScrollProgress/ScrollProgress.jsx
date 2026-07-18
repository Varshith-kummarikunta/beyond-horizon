export default function ScrollProgress({ fillRef }) {
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={fillRef} className="scroll-progress__fill" />
    </div>
  );
}
