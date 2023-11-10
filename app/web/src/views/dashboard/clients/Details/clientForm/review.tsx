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
  FormLabel,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import SubCard from "../../../../../components/SubCard";
import { ExpandMore } from "@mui/icons-material";
import { ReviewLabelObj } from "./data";

// Replace ExpandMoreIcon with the actual Material-UI ExpandMore icon component

interface ReviewAndSubmitProps {
  formData: FormData;
  onReviewSubmit: (values: { agreedToTerms: boolean }) => void;
  onEdit: (target: string) => void;
}

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({
  formData,
  onReviewSubmit,
  onEdit,
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
                    {Object.entries(formData).map(([key, value]) => (
                      <Grid item xs={12} key={key}>
                        <FormLabel component="legend">
                          {ReviewLabelObj[key]}
                        </FormLabel>

                        <Typography>
                          {Array.isArray(value) ? value.join(", ") : value}
                        </Typography>
                      </Grid>
                    ))}
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
