import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { themePalette } from '../themes/schemes/palette';
// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

// ==============================|| CUSTOM MAIN CARD ||============================== //
interface IMainCard {
  border?: boolean;
  boxShadow?: boolean;
  children?: React.ReactNode;
  content?: boolean;
  elevation?: number;
  contentClass?: string;
  contentSX?: Record<any, any>;
  darkTitle?: boolean;
  secondary?: React.ReactElement | string | Record<any, any>;
  shadow?: string;
  sx?: Record<any, any>;
  title?: React.ReactElement | string | Record<any, any>;
}
type IAny = {
  ref?: any;
} & IMainCard;
const MainCard: React.FC<IAny> = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: any,
    ref,
  ) => {
    const theme = useTheme();

    return (
      <motion.div
        key={window.location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ height: '100%' }}
        transition={{ duration: 0.3 }}
      >
        <Card
          ref={ref}
          {...others}
          sx={{
            border: border ? '1px solid' : 'none',
            borderColor: themePalette.primary[200] + 25,
            ':hover': {
              boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
            },
            minHeight: '100%',
            // ...sx,
          }}
        >
          {/* card header and action */}
          {title && (
            <CardHeader
              sx={headerSX}
              title={darkTitle ? <Typography variant="h3">{title}</Typography> : title}
              action={secondary}
            />
          )}

          {/* content & header divider */}
          {title && <Divider />}

          {/* card content */}
          {content && (
            <CardContent sx={{ ...contentSX, py: 2, px: 1, minHeight: '100%' }} className={contentClass}>
              {children}
            </CardContent>
          )}
          {!content && children}
        </Card>
      </motion.div>
    );
  },
);

// MainCard.propTypes = {};

export default MainCard;
