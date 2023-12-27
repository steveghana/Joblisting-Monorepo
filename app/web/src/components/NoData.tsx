import { Box, Grid, Typography } from '@mui/material';
import NoDAta from '@/assets/images/empty-box.png';

const NoData = () => {
  return (
    <Grid height={'100%'} width={'100%'} sx={{ display: 'flex', alignSelf: 'center', overflow: 'hidden', p: 1 }}>
      <Box
        width={'100%'}
        height={'100%'}
        flexGrow={1}
        minHeight={100}
        mt={2}
        alignContent={'stretch'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <img width={150} height={150} src={NoDAta} alt="nodata" />
        <Typography variant="subtitle1">No data to display</Typography>
      </Box>
    </Grid>
  );
};
export default NoData;
