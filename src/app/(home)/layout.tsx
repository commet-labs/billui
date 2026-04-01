import { JsonLd, softwareJsonLd, websiteJsonLd } from "@/components/json-ld";
import { HomeLayout } from "@/components/layout/home";
import { baseOptions, githubLink } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={softwareJsonLd} />
      <HomeLayout {...baseOptions()} links={[githubLink]}>
        {children}
      </HomeLayout>
    </>
  );
}
