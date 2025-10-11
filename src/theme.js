import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },    // أزرق هادئ للأزرار
    secondary: { main: "#ff9800" },  // برتقالي للأزرار الثانوية
    background: {
      default: "#f9f9f9",            // خلفية الصفحة
      paper: "#fff",              // خلفية الكروت والفورمات
    },
    text: {
      primary: "#222",               // نص أساسي غامق
      secondary: "#555",             // نص ثانوي أفتح
    },
    error: { main: "#d32f2f" },
    warning: { main: "#ed6c02" },
    info: { main: "#0288d1" },
    success: { main: "#2e7d32" },
  },
  typography: {
    fontFamily: "Cairo, sans-serif",
  },
});
export default theme;
