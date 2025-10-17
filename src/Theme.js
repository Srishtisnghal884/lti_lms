import { orange } from '@mui/material/colors';
let orang = "#f1881e"
// Custom theme template
export const customizations = (mode) => ({
  palette: {
    mode: mode, 
    ...(mode === 'light'
      ? {
          primary: orange,
          background: {
            default: '#fff',
            paper: '#fff',
          },
        }
      : {
          primary: orange,
          background: {
            default: '#182958',
            paper: "#182958"
            // '#182958',
          },
        }),
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});  
