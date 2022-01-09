import {Backdrop, CircularProgress} from "@mui/material";
import {FC} from "react";

type Props = {
  open: boolean;
}

export const Loader: FC<Props> = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <CircularProgress variant="indeterminate" sx={{color: 'inherit'}} />
    </Backdrop>
  )
}
