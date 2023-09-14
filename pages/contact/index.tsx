import ContactMePage from "@/components/pages/contact";
import Head from "next/head";

type PageProps = {};

export default function Contact(props: PageProps) {
  return (
    <>
      <Head>
        <title>Gilad Tsabar | Contact Me</title>
      </Head>

      <ContactMePage />
    </>
  );
}
