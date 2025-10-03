import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-[calc(100dvh-4rem)]">
      <div className="w-full">
        <div className="relative min-h-128 flex flex-col bg-primary/10 mb-4 items-center justify-center">
          <h1
            className="text-center font-bold text-8xl select-none mb-8 
             opacity-0 animate-[fadeIn_1s_ease-out_forwards] font-serif"
          >
            RentEZ Property
          </h1>
          <div className="flex gap-4">
            <Button variant="outline" size="lg">Search for Property</Button>
            <Button size="lg">Rent a Room</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
