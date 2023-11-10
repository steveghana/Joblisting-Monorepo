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
  Chip,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import SubCard from "../../../../../components/SubCard";
import { ExpandMore } from "@mui/icons-material";
import { ReviewLabelObj } from "./data";
import { useFormData } from "./clientFormContext";
import { themePalette } from "../../../../../themes/schemes/palette";

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
  const { formDataState } = useFormData();

  console.log(formDataState, "this is the form");
  return (
    <Formik
      initialValues={{ agreedToTerms: false }}
      onSubmit={(values) => onReviewSubmit(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <SubCard>
            <CardContent>
              <Typography variant="body2">Review and Submit</Typography>

              <Divider />
              <Grid>
                {Object.keys(formDataState).map((item, index) => (
                  <>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="h6" fontWeight={"bold"}>
                          {item}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Grid>
                          {Object.entries(
                            formDataState[item] as Record<
                              string,
                              string | [string]
                            >
                          ).map(([key, value], index) => (
                            <Grid my={index !== 0 && 4} item xs={12} key={key}>
                              <FormLabel component="legend">
                                <Typography fontWeight={"bold"}>
                                  {ReviewLabelObj[key]}*
                                </Typography>
                              </FormLabel>
                              <Typography mt={1}>
                                {Array.isArray(value)
                                  ? value?.map((value) => (
                                      <Chip label={value} />
                                    ))
                                  : value}
                              </Typography>
                            </Grid>
                          ))}
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

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                // label="Label"
                label={"I agree to the terms and conditions"}
                name="agreedToTerms"
                // sx={{ background: themePalette.primary.light }}
              />
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
