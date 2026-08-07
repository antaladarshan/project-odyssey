import { ThemeProvider } from "next-themes";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SmoothScrollProvider>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
