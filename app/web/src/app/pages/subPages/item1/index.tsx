import { Helmet } from "react-helmet-async";
import PageTitle from "../../../../components/PageTitle";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import { Container } from "@mui/material";
import Footer from "../../../../components/Footer";
function SubPage1() {
  return (
    <>
      <Helmet>
        <title>This is a miscelleneous page</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle heading="item 1" subHeading="A miscelleneous page" />
      </PageTitleWrapper>
      <Container maxWidth="lg">Item on page2</Container>
      <Footer />
    </>
  );
}

export default SubPage1;
