import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { BootIntro } from "./BootIntro";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BootIntro />
      <CustomCursor />
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}