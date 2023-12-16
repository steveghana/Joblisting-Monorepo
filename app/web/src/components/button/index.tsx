import { Typography } from '@mui/material';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import React from 'react';

interface IButtonProps extends LoadingButtonProps {
    text: string; // Add your custom text property
    children?: React.ReactNode;
}

function CustomButton(props: IButtonProps) {
    return (
        <LoadingButton
            {...props}
            // fullWidth
            loadingPosition="end"
            variant={props.variant || 'contained'}
            sx={{
                my: 1,
                boxShadow: 'rgba(77, 172, 255, 0.45) 0px 13px 27px -5px, rgba(77, 172, 255, 0.4) 0px 8px 16px -8px;',
                borderRadius: '10px',
                // color: "white",
                minWidth: '50px',
                // background: "red",
                // background: props.variant === "contained" && themePalette.primary.main,
            }}
        >
            <Typography fontSize={'.7rem'} variant="button">
                {props.text}
            </Typography>
            {props.children}
        </LoadingButton>
    );
}

export default CustomButton;
