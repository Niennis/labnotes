import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../utils/theme.js';

const ConfirmDialog = ({ open, onclick, onclose }) => {

  return (
    <div>
      <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Desea confirmar esta acción?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{ borderColor: '#40414c89', color: '#40414c89' }}
          onClick={onclose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#6C9400', color: 'white' }}
            onClick={onclick}
            autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default ConfirmDialog;
