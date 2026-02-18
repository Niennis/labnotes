import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6C9400',
    },
    secondary: {
      light: '#40414c89',
      main: '#40414c',
    },
  },
});

export const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#6C9400'),
  backgroundColor: "#6C9400",
  '&:hover': {
    backgroundColor: "#40414c89",
    color: 'white'
  },
}));
