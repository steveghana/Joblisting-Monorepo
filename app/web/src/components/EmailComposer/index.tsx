// GmailComposer.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Chip,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Autocomplete,
  Paper,
  Stack,
  Typography,
  createFilterOptions,
  Avatar,
  Grid,
  FormControl,
  FormHelperText,
} from '@mui/material';
import * as Yup from 'yup';

import { Close, Send } from '@mui/icons-material';
import { themePalette } from '@/themes/schemes/palette';
import CustomButton from '../button';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { options } from 'numeral';
import { validateUser } from '@/utils/tablevalidate';
interface Recipient {
  email: string;
  name: string;
}
export interface SimpleDialogProps {
  open: boolean;
  setDialogOpen: (value: React.SetStateAction<boolean>) => void;
}
const validationSchema = Yup.object({
  recipients: Yup.array().min(1, 'At least one recipient is required'),

  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('message is required'),

  // Add other validation rules for other fields if needed
});
const ComposeEmail = (props: SimpleDialogProps) => {
  const Allrecipients = [
    { email: 'john.doe@example.com', name: 'John Doe' },
    { email: 'jane.smith@example.com', name: 'Jane Smith' },
    // Add more recipients as needed
  ];
  const [to, setTo] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [recipients, setRecipients] = useState<Recipient[]>();

  const filter = createFilterOptions<Recipient>();

  return (
    <Modal open={props.open} onClose={() => props.setDialogOpen(false)} aria-labelledby="form-dialog-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: { lg: 600, md: 600, sm: 450, xs: 350 },
          // width: 600,
          bgcolor: 'white',
          outline: 0,
          borderRadius: 4,
        }}
      >
        <Formik
          initialValues={{ subject: '', message: '', recipients: [] }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            // Implement your submit logic here
            console.log(values);
            props.setDialogOpen(false);
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 1,
                  alignItems: 'center',
                  p: 1,
                  background: themePalette.warning.light,
                }}
              >
                <Typography>New Message</Typography>
                <IconButton onClick={() => props.setDialogOpen(false)}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
              <Stack sx={{ px: 2, py: 1 }} spacing={1}>
                <FormControl fullWidth>
                  <Field
                    name="recipients"
                    render={({ field, form }) => (
                      <Autocomplete
                        {...field}
                        options={Allrecipients}
                        getOptionLabel={(option: Recipient) => option.name}
                        filterOptions={(options, params) => filter(options, params)}
                        isOptionEqualToValue={(option: Recipient, value: Recipient) => option.email === value.email}
                        freeSolo
                        multiple
                        onChange={(_event, newValue: Recipient[] | null, reason) => {
                          // Handle free text input or selected options
                          if (reason === 'selectOption' || reason === 'removeOption') {
                            form.setFieldValue(field.name, Array.isArray(newValue) ? newValue : [newValue]);
                          } else if (reason === 'createOption') {
                            console.log(newValue, field.value, 'from create');
                            let newValuelength = newValue?.length || 0;
                            let valueString = newValue![newValuelength - 1] as unknown as string;
                            const valueObj = {
                              email: valueString,
                              name: valueString,
                            };
                            form.setFieldValue(field.name, [...field.value, valueObj]);
                          }
                        }}
                        renderTags={(value: Recipient[], getTagProps) =>
                          value.map((option, index) => {
                            return (
                              <Chip
                                label={typeof option === 'string' ? option : `${option.email}`}
                                {...getTagProps({ index })}
                              />
                            );
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="To"
                            variant="standard"
                            style={{ marginBottom: '16px', border: 'none', outline: 'none' }}
                          />
                        )}
                        renderOption={(props, option, { inputValue }) => {
                          // console.log(inputValue, option);
                          return (
                            <li {...props} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <Avatar sizes="small">{option.name ? option.name[0] : inputValue[0]}</Avatar>
                              <Grid container>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <Typography variant="body2" style={{ fontWeight: 600 }}>
                                    {option.name || inputValue}
                                  </Typography>
                                </Grid>
                                {option.email && (
                                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Typography variant="body2" style={{ fontWeight: 600 }}>
                                      {option.email}
                                    </Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </li>
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage name="recipients" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    as={TextField}
                    variant="standard"
                    placeholder="Subject"
                    name="subject"
                    autoComplete="off"
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                  />
                  <ErrorMessage name="subject" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    as={TextField}
                    placeholder="Message"
                    variant="standard"
                    name="message"
                    multiline
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                    rows={8}
                  />

                  <ErrorMessage name="message" component="div">
                    {(msg) => (
                      <FormHelperText error variant="filled">
                        {msg}
                      </FormHelperText>
                    )}
                  </ErrorMessage>
                </FormControl>
                <CustomButton text="Send" type="submit" endIcon={<Send fontSize="small" />} />
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ComposeEmail;
