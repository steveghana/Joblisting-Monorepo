import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import SubCard from "../../../../../components/SubCard";
import { ExpandMore } from "@mui/icons-material";

// Replace ExpandMoreIcon with the actual Material-UI ExpandMore icon component

type FormData = {
  [key: string]: string | string[] | boolean;
};

interface ReviewAndSubmitProps {
  formData: FormData;
  onReviewSubmit: (values: { agreedToTerms: boolean }) => void;
}

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({
  formData,
  onReviewSubmit,
}) => {
  console.log(formData);
  return (
    <Formik
      initialValues={{ agreedToTerms: false }}
      onSubmit={(values) => onReviewSubmit(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <SubCard>
            <CardContent>
              <Typography variant="h6">Review and Submit</Typography>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1">
                    Client Information
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {/* {Object.entries(formData).map(([key, value]) => (
                      <Grid item xs={12} key={key}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {key}:
                        </Typography>
                        <Typography>
                          {Array.isArray(value) ? value.join(", ") : value}
                        </Typography>
                      </Grid>
                    ))} */}
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Add more accordions for different sections as needed */}

              <Field name="agreedToTerms" type="checkbox" />
              <label htmlFor="agreedToTerms">
                I agree to the terms and conditions
              </label>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between", pt: 2 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </CardActions>
          </SubCard>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewAndSubmit;
