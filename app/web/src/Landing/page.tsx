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
  Footer
} from './components/exports';
import NavBar from './components/nav';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Container>
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
