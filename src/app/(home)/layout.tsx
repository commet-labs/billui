import { JsonLd, softwareJsonLd, websiteJsonLd } from "@/components/json-ld";
import { HomeLayout } from "@/components/layout/home";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={softwareJsonLd} />
      <HomeLayout {...baseOptions()}>{children}</HomeLayout>
    </>
  );
}
