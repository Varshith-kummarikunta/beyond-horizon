export default function LoaderProgress({ progress }) {
  return (
    <div className="mt-8 text-sm tracking-[0.3em] text-zinc-400">
      {progress}%
    </div>
  );
}