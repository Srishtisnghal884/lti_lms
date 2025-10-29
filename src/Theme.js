import { orange } from '@mui/material/colors'; 
// Custom theme template
export const customizations = (mode) => ({
  palette: {
    mode: mode, 
    ...(mode === 'light'
      ? {
          primary: orange,
          background: {
            default: '#171010ff',
            paper: '#fff',
          },
        }
      : {
          primary: orange,
           background: {
            default: '#ffff',
            paper: "#ffff"
            // '#182958',
          },
          // background: {
          //   default: '#182958',
          //   paper: "#182958"
          //   // '#182958',
          // },
        }),
  },
  typography: {
    fontFamily: ["'Gotham-Medium'"].join(','),
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // Target WebKit browsers
        'html, body': {
          scrollbarWidth: 'thin', // Firefox
          scrollbarColor: '#888 #f1f1f1', // Firefox 
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        },
      },
    }
  },
});  
