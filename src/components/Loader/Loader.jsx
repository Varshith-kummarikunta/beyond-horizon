import LoaderProgress from "./LoaderProgress";
import LoaderText from "./LoaderText";

export default function Loader({ progress }) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]">
      <LoaderText />
      <LoaderProgress progress={progress} />
    </div>
  );
}