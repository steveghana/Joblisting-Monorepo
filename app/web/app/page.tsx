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
import { Container } from "@mui/material";
export default function Home() {
  return (
    <Container className="flex w-full">
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
    </Container>
  );
}
