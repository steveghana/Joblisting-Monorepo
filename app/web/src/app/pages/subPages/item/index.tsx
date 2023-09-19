import { Helmet } from "react-helmet-async";
import PageTitle from "../../../../components/PageTitle";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import {
  Button,
  Container,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import Footer from "../../../../components/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Protect } from "../../../../components/auth/requireAuth";

function Devs() {
  return (
    <>
      <Helmet>
        <title>This is a miscelleneous page</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle heading="item 1" subHeading="A miscelleneous page" />
      </PageTitleWrapper>
      <Container maxWidth="lg">Item on page</Container>
      <Footer />
    </>
  );
}
export default Protect(Devs, ["admin", "developer"]);
