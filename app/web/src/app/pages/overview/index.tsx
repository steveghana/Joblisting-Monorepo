import { Box, Container, Card } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { styled } from "@mui/material/styles";
import { Protect } from "../../../components/auth/requireAuth";
import Hero from "./Hero";

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Savannah Tech</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          {/* <Logo /> */}
        </Box>
        <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}>
          <Hero />
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Protect(Overview, ["Ceo"]);
