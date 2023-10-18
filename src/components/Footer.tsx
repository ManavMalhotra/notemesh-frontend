import { Paper } from "@mui/material";

export default function Footer() {
  return (
    <Paper
      sx={{
        marginTop: "calc(22% + 60px)",
        width: "100%",
        bottom: 0,
        backgroundColor: "#000000",
        textColor: "#fff",
        padding: "4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      component="footer"
      square
      variant="outlined"
    >
      <div>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#fff",
          }}
        >
          All rights reserved. © {new Date().getFullYear()}
        </a>
      </div>
    </Paper>
  );
}
