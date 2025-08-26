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
    <div className="bg-black text-white">
      <div className="px-4 pt-32 pb-16 md:px-8">
        <About {...about} />
      </div>
    </div>
  );
}
