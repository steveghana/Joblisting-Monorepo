import { Box, Grid, Paper, Typography, CssBaseline } from '@mui/material';
export default function AuthWrapper2(props) {
    return (
        <>
            <CssBaseline />
            <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden', display: 'flex' }}>
                <Grid item md={6} lg={6} sx={{ display: { md: 'flex', xs: 'none' } }}>
                    <Typography justifyContent={'center'} alignItems={'center'} textAlign={'center'} variant="h3">
                        What to display Here
                    </Typography>{' '}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {props.children}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
