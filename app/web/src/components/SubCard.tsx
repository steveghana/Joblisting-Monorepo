import React, { Ref } from "react";
import PropTypes from "prop-types";
import { forwardRef } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { themePalette } from "../themes/schemes/palette";

// ==============================|| CUSTOM SUB CARD ||============================== //
interface ISubCard {
  children: React.ReactNode;
  content?: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary?: string;
  sx?: Record<any, any>;
  contentSX?: Record<any, any>;
  title?: React.ReactNode | string;
}
const SubCard: React.FC<ISubCard> = forwardRef(
  (
    {
      children,
      content,
      contentClass,
      darkTitle,
      secondary,
      sx = {},
      contentSX = {},
      title,
      ...others
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        sx={{
          border: "1px solid",
          borderColor: themePalette.primary.light,
          ":hover": {
            boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
          },
          ...sx,
        }}
        // {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            title={<Typography variant="h5">{title}</Typography>}
            // action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            title={<Typography variant="h4">{title}</Typography>}
            // action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && (
          <Divider
            sx={{
              opacity: 1,
              borderColor: themePalette.primary.light,
            }}
          />
        )}

        {/* card content */}
        {content && (
          <CardContent
            sx={{ p: 2.5, ...contentSX }}
            className={contentClass || ""}
          >
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

SubCard.defaultProps = {
  content: true,
};

export default SubCard;
