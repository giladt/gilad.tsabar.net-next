import ContactMePage from "@/components/templates/contact";
import Head from "next/head";

type PageProps = {};

export default function Contact() {
  return (
    <>
      <Head>
        <title>Gilad Tsabar | Contact Me</title>
      </Head>

      <ContactMePage />
    </>
  );
}
