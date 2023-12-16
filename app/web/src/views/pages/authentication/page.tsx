import React, { useState } from 'react';
// import { signIn, signOut, useSession } from 'next-auth/react';
// import { Link } from 'react-router-dom';;
// import { UserAuthForm } from "../../../components/auth/registeration";
import LoginPage from '../../../components/auth/login';
import { Link } from 'react-router-dom';
import { Avatar, Box, Grid, Paper, Typography, createTheme, ThemeProvider, CssBaseline, Stack } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';
import FirebaseRegister from '../../../components/auth/auth-forms/authRegister';
// const defaultTheme = createTheme();

export default function Auth() {
    const [registerPage, setRegisterPage] = useState(false);
    console.log(registerPage);
    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7}>
                    <Typography justifyContent={'center'} alignItems={'center'} textAlign={'center'} variant="h3">
                        What to display Here
                    </Typography>{' '}
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {!registerPage ? (
                            // <div></div>
                            <LoginPage setRegisterPage={setRegisterPage} />
                        ) : (
                            <div>
                                <FirebaseRegister setRegisterPage={setRegisterPage} />
                                <Stack direction="row" gap={2} justifyContent={'center'}>
                                    <Typography variant="body2">Or login</Typography>
                                    <Typography color={'blue'} onClick={() => setRegisterPage(false)} variant="body2">
                                        login
                                    </Typography>
                                </Stack>

                                <Typography variant="caption" justifyContent={'center'}>
                                    By clicking continue, you agree to our{' '}
                                    <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                                        Privacy Policy
                                    </Link>
                                    .
                                </Typography>
                            </div>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
