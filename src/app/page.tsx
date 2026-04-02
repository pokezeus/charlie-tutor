import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <BookOpen className="h-12 w-12 text-blue-600" />
          <h1 className="text-4xl font-bold tracking-tight">Hello Charlie</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-md">
          Welcome to Charlie Tutor - your personalized learning companion.
          Built with Next.js 14, Tailwind CSS, and shadcn/ui.
        </p>
        <div className="flex gap-4 justify-center">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </main>
  );
}
