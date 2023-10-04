import { alpha, createTheme, lighten, darken } from "@mui/material";
import "@mui/lab/themeAugmentation";
import { colors } from "./palette";
import { styleOverrides } from "./compStyleOverride";
import { themeOption as theme } from "./palette";
export const themeColors = {
  primary: "#5569ff",
  secondary: "#6E759F",
  success: "#57CA22",
  warning: "#FFA319",
  error: "#FF1943",
  info: "#33C2FF",
  black: "#223354",
  white: "#ffffff",
  primaryAlt: "#000C57",
};
export const componentThemeoption = {
  customInput: {
    marginTop: 1,
    marginBottom: 1,
    "& > label": {
      top: 23,
      left: 0,
      color: theme.colors.grey500,
      '&[data-shrink="false"]': {
        top: 5,
      },
    },
    "& > div > input": {
      padding: "30.5px 14px 11.5px !important",
    },
    "& legend": {
      display: "none",
    },
    "& fieldset": {
      top: 0,
    },
  },
  mainContent: {
    backgroundColor: theme.background,
    width: "100%",
    minHeight: "calc(100vh - 88px)",
    flexGrow: 1,
    padding: "20px",
    marginTop: "88px",
    marginRight: "20px",
    borderRadius: `${50}px`,
  },
  menuCaption: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: theme.heading,
    padding: "6px",
    textTransform: "capitalize",
    marginTop: "10px",
  },
  subMenuCaption: {
    fontSize: "0.6875rem",
    fontWeight: 500,
    color: theme.darkTextSecondary,
    textTransform: "capitalize",
  },
  commonAvatar: {
    cursor: "pointer",
    borderRadius: "8px",
  },
  smallAvatar: {
    width: "22px",
    height: "22px",
    fontSize: "1rem",
  },
  mediumAvatar: {
    width: "34px",
    height: "34px",
    fontSize: "1.2rem",
  },
  largeAvatar: {
    width: "44px",
    height: "44px",
    fontSize: "1.5rem",
  },
};

export const PureLightTheme = createTheme({
  // direction: i18n.dir(),
  colors: styleOverrides.colors,
  general: styleOverrides.general,
  header: styleOverrides.header,
  sidebar: styleOverrides.sidebar,
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "& .MuiTouchRipple-root": {
            opacity: 0.3,
          },
          color: theme.darkTextPrimary,
          paddingTop: "10px",
          paddingBottom: "10px",
          "&.Mui-selected": {
            color: theme.menuSelected,
            backgroundColor: theme.menuSelectedBack,
            "&:hover": {
              backgroundColor: theme.menuSelectedBack,
            },
            "& .MuiListItemIcon-root": {
              color: theme.menuSelected,
            },
          },
          "&:hover": {
            backgroundColor: theme.menuSelectedBack,
            color: theme.menuSelected,
            "& .MuiListItemIcon-root": {
              color: theme.menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          minWidth: "36px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0,
        },
        primary: {
          color: theme.textDark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.textDark,
          "&::placeholder": {
            color: theme.darkTextSecondary,
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: theme.colors?.grey50,
          borderRadius: `${50}px`,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.colors?.grey400,
          },
          "&:hover $notchedOutline": {
            borderColor: theme.colors?.primaryLight,
          },
          "&.MuiInputBase-multiline": {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: theme.colors?.grey50,
          padding: "15.5px 14px",
          borderRadius: `${50}px`,
          "&.MuiInputBase-inputSizeSmall": {
            padding: "10px 14px",
            "&.MuiInputBase-inputAdornedStart": {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `${50}px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: theme.colors?.grey300,
          },
        },
        mark: {
          backgroundColor: theme.paper,
          width: "4px",
        },
        valueLabel: {
          color: theme?.colors?.primaryLight,
        },
      },
    },
    // MuiDivider: {
    //   styleOverrides: {
    //     root: {
    //       borderColor: theme.divider,
    //       opacity: 1,
    //     },
    //   },
    // },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.colors?.primaryDark,
          background: theme.colors?.primary200,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-deletable .MuiChip-deleteIcon": {
            color: "inherit",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.paper,
          background: theme.colors?.grey700,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(darken(themeColors.primaryAlt, 0.4), 0.2),
          backdropFilter: "blur(2px)",

          "&.MuiBackdrop-invisible": {
            backgroundColor: "transparent",
            backdropFilter: "blur(2px)",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textTransform: "none",
          marginLeft: 8,
          marginRight: 8,
          fontWeight: "bold",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // "html, body": {
        //   width: "100%",
        //   height: "100%",
        // },
        body: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
          flex: 1,
        },
        "#root": {
          width: "100%",
          height: "100%",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        },
        html: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
        },
        ".child-popover .MuiPaper-root .MuiList-root": {
          flexDirection: "column",
        },
        "#nprogress": {
          pointerEvents: "none",
        },
        "#nprogress .bar": {
          background: colors.primary.light,
        },
        "#nprogress .spinner-icon": {
          borderTopColor: colors.primary.light,
          borderLeftColor: colors.primary.light,
        },
        "#nprogress .peg": {
          boxShadow:
            "0 0 15px " +
            colors.primary.light +
            ", 0 0 8px" +
            colors.primary.light,
        },
        ":root": {
          "--swiper-theme-color": colors.primary.main,
        },
        code: {
          background: colors.info.light,
          color: colors.info.dark,
          borderRadius: 4,
          padding: 4,
        },
        "@keyframes ripple": {
          "0%": {
            transform: "scale(.8)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(2.8)",
            opacity: 0,
          },
        },
        "@keyframes float": {
          "0%": {
            transform: "translate(0%, 0%)",
          },
          "100%": {
            transform: "translate(3%, 3%)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        iconOutlined: {
          color: colors.alpha.black[50],
        },
        icon: {
          top: "calc(50% - 14px)",
        },
      },
    },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiInputAdornment-positionEnd.MuiInputAdornment-outlined": {
    //         paddingRight: 6,
    //       },
    //       "&:hover .MuiOutlinedInput-notchedOutline": {
    //         borderColor: colors.alpha.black[50],
    //       },
    //       "&.Mui-focused:hover .MuiOutlinedInput-notchedOutline": {
    //         borderColor: colors.primary.main,
    //       },
    //     },
    //   },
    // },
    // MuiListItem
    MuiListSubheader: {
      styleOverrides: {
        colorPrimary: {
          fontWeight: "bold",
          lineHeight: "40px",
          fontSize: 13,
          background: colors.alpha.black[5],
          color: colors.alpha.black[70],
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.colors?.textDark,
          padding: "24px",
        },
        title: {
          fontSize: "1.125rem",
        },
        action: {
          marginTop: -5,
          marginBottom: -5,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
        },
      },
    },
    // MuiChip: {
    //   styleOverrides: {
    //     colorSecondary: {
    //       background: colors.alpha.black[5],
    //       color: colors.alpha.black[100],

    //       "&:hover": {
    //         background: colors.alpha.black[10],
    //       },
    //     },
    //     deleteIcon: {
    //       color: colors.error.light,

    //       "&:hover": {
    //         color: colors.error.main,
    //       },
    //     },
    //   },
    // },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",

          "&.Mui-expanded": {
            margin: 0,
          },
          "&::before": {
            display: "none",
          },
        },
      },
    },
    // MuiAvatar: {
    //   styleOverrides: {
    //     root: {
    //       fontSize: 14,
    //       fontWeight: "bold",
    //     },
    //     colorDefault: {
    //       background: colors.alpha.black[30],
    //       color: colors.alpha.white[100],
    //     },
    //   },
    // },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          alignItems: "center",
        },
        avatar: {
          background: colors.alpha.black[10],
          fontSize: 13,
          color: colors.alpha.black[70],
          fontWeight: "bold",

          "&:first-of-type": {
            border: 0,
            background: "transparent",
          },
        },
      },
    },
    MuiListItemAvatar: {
      styleOverrides: {
        alignItemsFlexStart: {
          marginTop: 0,
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        page: {
          fontSize: 13,
          fontWeight: "bold",
          transition: "all .2s",
        },
        textPrimary: {
          "&.Mui-selected": {
            boxShadow: colors.shadows.primary,
          },
          "&.MuiButtonBase-root:hover": {
            background: colors.alpha.black[5],
          },
          "&.Mui-selected.MuiButtonBase-root:hover": {
            background: colors.primary.main,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontWeight: "bold",
          textTransform: "none",
          paddingLeft: 16,
          paddingRight: 16,
          borderRadius: "4px",

          ".MuiSvgIcon-root": {
            transition: "all .2s",
          },
        },
        endIcon: {
          marginRight: -8,
        },
        containedSecondary: {
          backgroundColor: colors.secondary.main,
          color: colors.alpha.white[100],
          border: "1px solid " + colors.alpha.black[30],
        },
        outlinedSecondary: {
          backgroundColor: colors.alpha.white[100],

          "&:hover, &.MuiSelected": {
            backgroundColor: colors.alpha.black[5],
            color: colors.alpha.black[100],
          },
        },
        sizeSmall: {
          padding: "6px 16px",
          lineHeight: 1.5,
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiToggleButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          color: colors.primary.main,
          background: colors.alpha.white[100],
          transition: "all .2s",

          "&:hover, &.Mui-selected, &.Mui-selected:hover": {
            color: colors.alpha.white[100],
            background: colors.primary.main,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: 8,

          "& .MuiTouchRipple-root": {
            borderRadius: 8,
          },
        },
        sizeSmall: {
          padding: 4,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          background: colors.alpha.black[10],
          border: 0,
          height: 1,
        },
        vertical: {
          height: "auto",
          width: 1,

          "&.MuiDivider-flexItem.MuiDivider-fullWidth": {
            height: "auto",
          },
          "&.MuiDivider-absolute.MuiDivider-fullWidth": {
            height: "100%",
          },
        },
        withChildren: {
          "&:before, &:after": {
            border: 0,
          },
        },
        wrapper: {
          background: colors.alpha.white[100],
          fontWeight: "bold",
          height: 24,
          lineHeight: "24px",
          marginTop: -12,
          color: "inherit",
          textTransform: "uppercase",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 0,
        },
        elevation0: {
          boxShadow: "none",
        },
        elevation: {
          boxShadow: colors.shadows.card,
        },
        elevation2: {
          boxShadow: colors.shadows.cardSm,
        },
        elevation24: {
          boxShadow: colors.shadows.cardLg,
        },
        outlined: {
          boxShadow: colors.shadows.card,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 6,
        },
      },
    },
    // MuiSlider: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiSlider-valueLabelCircle, .MuiSlider-valueLabelLabel": {
    //         transform: "none",
    //       },
    //       "& .MuiSlider-valueLabel": {
    //         borderRadius: 6,
    //         background: colors.alpha.black[100],
    //         color: colors.alpha.white[100],
    //       },
    //     },
    //   },
    // },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,

          "& .MuiListItem-button": {
            transition: "all .2s",

            "& > .MuiSvgIcon-root": {
              minWidth: 34,
            },

            "& .MuiTouchRipple-root": {
              opacity: 0.2,
            },
          },
          "& .MuiListItem-root.MuiButtonBase-root.Mui-selected": {
            backgroundColor: alpha(colors.primary.dark, 0.4),
          },
          "& .MuiMenuItem-root.MuiButtonBase-root:active": {
            backgroundColor: alpha(colors.primary.light, 0.4),
          },
          "& .MuiMenuItem-root.MuiButtonBase-root .MuiTouchRipple-root": {
            opacity: 0.2,
          },
        },
        padding: {
          padding: "12px",

          "& .MuiListItem-button": {
            borderRadius: 6,
            margin: "1px 0",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          height: 38,
          minHeight: 38,
          overflow: "visible",
        },
        indicator: {
          height: 38,
          minHeight: 38,
          borderRadius: 6,
          border: "1px solid " + colors.primary.dark,
          boxShadow: "0px 2px 10px " + colors.primary.light,
        },
        scrollableX: {
          overflow: "visible !important",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          height: 38,
          minHeight: 38,
          borderRadius: 6,
          transition: "color .2s",
          textTransform: "capitalize",

          "&.MuiButtonBase-root": {
            minWidth: "auto",
            paddingLeft: 20,
            paddingRight: 20,
            marginRight: 4,
          },
          "&.Mui-selected, &.Mui-selected:hover": {
            color: colors.alpha.white[100],
            zIndex: 5,
          },
          "&:hover": {
            color: colors.alpha.black[100],
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          padding: 12,
        },
        list: {
          padding: 12,

          "& .MuiMenuItem-root.MuiButtonBase-root": {
            fontSize: 14,
            marginTop: 1,
            marginBottom: 1,
            transition: "all .2s",
            color: colors.alpha.black[70],

            "& .MuiTouchRipple-root": {
              opacity: 0.2,
            },

            "&:hover, &:active, &.active, &.Mui-selected": {
              color: colors.alpha.black[100],
              background: alpha(colors.primary.light, 0.4),
            },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: "transparent",
          transition: "all .2s",

          "&:hover, &:active, &.active, &.Mui-selected": {
            color: colors.alpha.black[100],
            background: alpha(colors.primary.light, 0.4),
          },
          "&.Mui-selected:hover": {
            background: alpha(colors.primary.light, 0.4),
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.MuiButtonBase-root": {
            color: colors.secondary.main,

            "&:hover, &:active, &.active, &.Mui-selected": {
              color: colors.alpha.black[100],
              background: lighten(colors.primary.light, 0.5),
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          margin: 1,
        },
        root: {
          ".MuiAutocomplete-inputRoot.MuiOutlinedInput-root .MuiAutocomplete-endAdornment":
            {
              right: 14,
            },
        },
        clearIndicator: {
          background: colors.error.light,
          color: colors.error.main,
          marginRight: 8,

          "&:hover": {
            background: colors.error.light,
            color: colors.error.dark,
          },
        },
        popupIndicator: {
          color: colors.alpha.black[50],

          "&:hover": {
            background: colors.primary.light,
            color: colors.primary.main,
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          "& .MuiIconButton-root": {
            padding: 8,
          },
        },
        select: {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "0 !important",
          padding: "0 !important",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        head: {
          background: colors.alpha.black[5],
        },
        root: {
          transition: "background-color .2s",

          "&.MuiTableRow-hover:hover": {
            backgroundColor: colors.alpha.black[5],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: colors.alpha.black[10],
          fontSize: 14,
        },
        head: {
          textTransform: "uppercase",
          fontSize: 13,
          fontWeight: "bold",
          color: colors.alpha.black[70],
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        message: {
          lineHeight: 1.5,
          fontSize: 14,
        },
        standardInfo: {
          color: colors.info.main,
        },
        action: {
          color: colors.alpha.black[70],
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          margin: 0,
          zIndex: 5,
          position: "absolute",
          top: "50%",
          marginTop: -6,
          left: -6,
        },
        outlined: {
          backgroundColor: colors.alpha.white[100],
          boxShadow: "0 0 0 6px " + colors.alpha.white[100],
        },
        outlinedPrimary: {
          backgroundColor: colors.alpha.white[100],
          boxShadow: "0 0 0 6px " + colors.alpha.white[100],
        },
      },
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          position: "absolute",
          height: "100%",
          top: 0,
          borderRadius: 50,
          backgroundColor: colors.alpha.black[10],
        },
      },
    },
    MuiTimelineItem: {
      styleOverrides: {
        root: {
          minHeight: 0,
          padding: "8px 0",

          "&:before": {
            display: "none",
          },
        },
        missingOppositeContent: {
          "&:before": {
            display: "none",
          },
        },
      },
    },
    // MuiTooltip: {
    //   styleOverrides: {
    //     tooltip: {
    //       backgroundColor: alpha(colors.alpha.black["100"], 0.95),
    //       padding: "8px 16px",
    //       fontSize: 13,
    //     },
    //     arrow: {
    //       color: alpha(colors.alpha.black["100"], 0.95),
    //     },
    //   },
    // },
    MuiSwitch: {
      styleOverrides: {
        root: {
          height: 33,
          overflow: "visible",

          "& .MuiButtonBase-root": {
            position: "absolute",
            padding: 6,
            transition:
              "left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          },
          "& .MuiIconButton-root": {
            borderRadius: 100,
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            opacity: 0.3,
          },
        },
        thumb: {
          border: "1px solid " + colors.alpha.black[30],
          boxShadow:
            "0px 9px 14px " +
            colors.alpha.black[10] +
            ", 0px 2px 2px " +
            colors.alpha.black[10],
        },
        track: {
          backgroundColor: colors.alpha.black[5],
          border: "1px solid " + colors.alpha.black[10],
          boxShadow: "inset 0px 1px 1px " + colors.alpha.black[10],
          opacity: 1,
        },
        colorPrimary: {
          "& .MuiSwitch-thumb": {
            backgroundColor: colors.alpha.white[100],
          },

          "&.Mui-checked .MuiSwitch-thumb": {
            backgroundColor: colors.primary.main,
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          paddingTop: 20,
          paddingBottom: 20,
          background: colors.alpha.black[5],
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.MuiStepIcon-completed": {
            color: colors.success.main,
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "div",
          h4: "div",
          h5: "div",
          h6: "div",
          subtitle1: "div",
          subtitle2: "div",
          body1: "div",
          body2: "div",
        },
      },
      styleOverrides: {
        gutterBottom: {
          marginBottom: 4,
        },
        paragraph: {
          fontSize: 17,
          lineHeight: 1.7,
        },
      },
    },
  },
  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',

    h3: {
      fontFamily: ["Didact Gothic"].join(","),
      fontWeight: 700,
      fontSize: 25,
      lineHeight: 1.4,
      color: colors.alpha.black[100],
    },
    h5: {
      fontFamily: ["Didact Gothic"].join(","),
      fontWeight: 700,
      fontSize: "0.875rem",
      color: theme.heading,
    },
    body1: {
      fontFamily: ["Poppins"].join(","),
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334em",
    },
    body2: {
      fontFamily: ["Lato"].join(","),
      letterSpacing: "0em",
      fontWeight: 400,
      lineHeight: "1.5em",
      color: theme.darkTextPrimary,
    },
    button: {
      fontFamily: ["Poppins"].join(","),
      fontSize: 14,
      fontWeight: 600,
    },
    caption: {
      fontFamily: ["Lato"].join(","),
      textTransform: "uppercase",
      color: theme.darkTextSecondary,
      fontSize: "0.75rem",
      fontWeight: 400,
    },

    overline: {
      fontSize: 13,
      fontWeight: 700,
      textTransform: "uppercase",
    },
    h6: {
      fontWeight: 500,
      color: theme.heading,
      fontSize: "0.75rem",
    },

    h4: {
      fontSize: "1rem",
      color: theme.heading,
      fontWeight: 600,
    },

    h2: {
      fontSize: "1.5rem",
      color: theme.heading,
      fontWeight: 700,
    },
    h1: {
      fontSize: "2.125rem",
      color: theme.heading,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 500,
      color: theme.textDark,
    },
    subtitle2: {
      fontSize: "0.75rem",
      fontWeight: 400,
      color: theme.darkTextSecondary,
    },
  },
});
