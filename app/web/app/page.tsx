import Image from "next/image";
// import styles from "./page.module.css";
import {
  Nav,
  Banner,
  Messaging,
  ProdFeatures,
  DarkExplore,
  Testimonial,
  Blogs,
  Sponsors,
  QMessageInput,
  Footer,
} from "@/Landing/components/exports";
import NavBar from "@/Landing/components/nav";
export default function Home() {
  return (
    <div style={{ width: "100vw", position: 'relative' /*  background: "red" */ }}>
      <NavBar />
      <Banner />
      <Messaging />
      <ProdFeatures />
      <DarkExplore />
      <Testimonial />
      <Blogs />
      <Sponsors />
      <QMessageInput />
      <Footer />
    </div>
  );
}
