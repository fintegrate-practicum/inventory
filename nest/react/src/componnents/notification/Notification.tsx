import { FunctionComponent, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface State extends SnackbarOrigin {
    open: boolean;
}
type NotificationProps = {
    messege: string
}
const Notification: FunctionComponent<NotificationProps> = ({ messege }) => {

    const [state] = useState<State>({
        open: true,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                message={messege}
                key={vertical + horizontal}
            />
        </Box>
    );
}

export default Notification;