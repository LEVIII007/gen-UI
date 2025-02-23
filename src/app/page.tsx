import LeftHero from "@/components/left-hero-component";
import RightHero from "@/components/right-hero-component";

export default function Home() {
  return (
    <main className="max-w-[1440px] mx-auto flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12 relative">
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center md:-mt-12 animate-colorChange">
        <LeftHero />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
        <RightHero />
      </div>
    </main>
  );
}
