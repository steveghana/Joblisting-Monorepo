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
  Divider,
  ButtonBase,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import SubCard from "../../../../../components/SubCard";
import { ExpandMore } from "@mui/icons-material";
import { ReviewLabelObj } from "./data";

// Replace ExpandMoreIcon with the actual Material-UI ExpandMore icon component

type FormData = {
  [key: string]: string | string[] | boolean;
};

interface ReviewAndSubmitProps {
  formData: FormData;
  onReviewSubmit: (values: { agreedToTerms: boolean }) => void;
  onEdit: (target: number) => void;
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

              <Grid>
                {Object.keys(formData).map((item, index) => (
                  <>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{item}</Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* <Divider /> */}
                        <Grid>
                          {Object.entries(formData[item]).map(
                            ([key, value], index) => (
                              <Grid mb={2} item xs={12} key={key}>
                                <FormLabel component="legend">
                                  {ReviewLabelObj[key]}*
                                </FormLabel>
                                <Typography mt={1}>
                                  {Array.isArray(value)
                                    ? value.join(", ")
                                    : value}
                                </Typography>
                              </Grid>
                            )
                          )}
                        </Grid>
                        {/* <Divider /> */}
                        <ButtonBase
                          sx={{
                            alignSelf: "flex-start",
                            padding: 1,
                            outline: "none",
                          }}
                        >
                          <Typography
                            color={"blue"}
                            onClick={() => onEdit(index)}
                          >
                            Edit
                          </Typography>
                        </ButtonBase>
                      </AccordionDetails>
                    </Accordion>
                  </>
                ))}
              </Grid>

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
