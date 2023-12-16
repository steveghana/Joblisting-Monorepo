import { Box } from '@mui/material';
import MainCard from '../MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }: { children: React.ReactNode }) => (
    <MainCard
        sx={{
            margin: { xs: 2.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%',
            },
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 1, sm: 2, xl: 3 } }}>{children}</Box>
    </MainCard>
);

export default AuthCardWrapper;

