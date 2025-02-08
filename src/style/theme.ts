import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#FF6347",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000",
      secondary: "#000",
    },
  },

  spacing:(v:number)=>v*8
});

export default theme;
