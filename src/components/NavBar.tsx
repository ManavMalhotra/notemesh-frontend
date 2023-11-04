import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function NavBar() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = React.useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Box sx={{ flexGrow: 1,
    }}>
      <AppBar
        position="static"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#272727",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <MenuIcon />
          </IconButton>

          {authenticated ? (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  signOut(auth).then(() => {
                    // Sign-out successful.
                    navigate("/signin");
                  });
                }}
              >
                LogOut
              </Button>
            </>
          ) : (
            <div>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                SignIn
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                SignUp
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
