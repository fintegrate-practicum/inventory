import { FunctionComponent, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { blue } from '@mui/material/colors';

interface State extends SnackbarOrigin {
    open: boolean;
}
type NotificationProps = {
    messege: string,
    vertical: 'top'|'bottom',
    horizontal: 'right'|'left'|'center',
}
const Notification: FunctionComponent<NotificationProps> = ({ messege, vertical, horizontal }) => {

    // const [state] = useState<State>({
    //     open: true,
    //     vertical: 'top',
    //     horizontal: 'center',
    // });
    // const { vertical, horizontal, open } = state;

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={true}
                message={messege}
                key={vertical + horizontal}
                sx={{ backgroundColor: blue }}
            />
        </Box>
    );
}

export default Notification;