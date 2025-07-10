import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { About } from "@/components/About";
import { PageNotSetup } from "@/components/MissingPage";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/lib/queries";

export default async function AboutPage() {
  const { data: about } = await sanityFetch({ query: ABOUT_QUERY });

  if (!about) {
    return <PageNotSetup pageType="About Page" studioPath="about" />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="px-4 pt-32 pb-16 md:px-8">
        <About {...about} />
      </main>

      <Footer />
    </div>
  );
}
