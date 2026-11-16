import { ThemeProvider } from "next-themes";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {/* `marketing-light` = light redesign. Remove this class to revert to the dark look. */}
      <div className="marketing-light flex-1 flex flex-col">
        <SmoothScrollProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </div>
    </ThemeProvider>
  );
}
