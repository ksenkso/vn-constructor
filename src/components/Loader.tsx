import {FC} from "react";
import {Box, CircularProgress, Fade} from "@mui/material";

interface Props {
  loading: boolean;
}

export const Loader: FC<Props> = ({loading}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Fade in={loading}>
        <CircularProgress variant={"indeterminate"}/>
      </Fade>
    </Box>
  )
}
