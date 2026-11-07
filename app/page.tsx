import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pipeline from "@/components/Pipeline";
import Control from "@/components/Control";
import OfflineTest from "@/components/OfflineTest";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pipeline />
        <Control />
        <OfflineTest />
      </main>
      <Footer />
    </>
  );
}
