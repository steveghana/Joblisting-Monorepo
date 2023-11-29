import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Close, LockOutlined, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import CustomButton from "../button";
type IAlert = {
  open: boolean;
  handleClose: () => void;
  // row:any;
  deleteFn: () => void;
};
export default function AlertDialog({ handleClose, open, deleteFn }: IAlert) {
  const proceed = () => {
    deleteFn();
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          display={"flex"}
          alignItems={"center"}
          position={"relative"}
        >
          <Grid
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mx={"auto"}
          >
            <LockOutlined color="warning" />
            <Typography variant="h6" fontWeight={700}>
              Caution
            </Typography>
          </Grid>
          <IconButton
            sx={{ position: "absolute", top: 1, right: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>Are you sure you want to delete this row.</Typography>
            <Typography>Action taken is not reversible</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex" }}>
          <Grid
            sx={{
              display: "flex",
              mx: "auto",
              alignSelf: "center",
              gap: 1,
            }}
          >
            <CustomButton
              text="Disagree"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              variant="outlined"
              endIcon={<ThumbDown fontSize="small" />}
            />
            <CustomButton
              text="Agree"
              autoFocus
              onClick={(e) => {
                e.stopPropagation();
                proceed();
              }}
              endIcon={<ThumbUp fontSize="small" />}
            />
          </Grid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
