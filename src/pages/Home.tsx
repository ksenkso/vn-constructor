import {FC} from "react";
import {AppBar, Box, Button, Container, Stack, Toolbar, Typography} from "@mui/material";
import {observer} from "mobx-react";
import {api} from "../hooks/api";
import {Link} from "react-router-dom";
import {Stories} from "./Stories";

export const Home: FC = observer(() => {
  const logout = () => api.logout()

  return (
    <Stack>
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
              <Button
                variant="text"
                sx={{
                  color: 'primary.contrastText'
                }}
                onClick={logout}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{pt: 4}}>
        <Stories/>
      </Container>
    </Stack>
  )
})
