import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useApi} from "../hooks/api";
import {observer} from "mobx-react";

export const Header = observer(() => {
  const api = useApi()
  const logout = () => api.logout()

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={(props) => <Link {...props} to="/">VNP | Constructor</Link>}
            sx={{
              color: 'white',
              textDecoration: 'none',
              userSelect: 'none',
            }}
          />
          <Box sx={{
            ml: 'auto'
          }}>
            {api.isLoggedIn && <Button
              variant="text"
              sx={{
                color: 'primary.contrastText'
              }}
              onClick={logout}
            >
              Logout
            </Button>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
})
