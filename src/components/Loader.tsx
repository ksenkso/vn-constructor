import {FC} from "react";
import {Backdrop, CircularProgress} from "@mui/material";

interface Props {
  open: boolean;
}

export const Loader: FC<Props> = ({ open }) => {
  return (
    <Backdrop open={open} data-testid="backdrop">
      <CircularProgress variant={"indeterminate"} />
    </Backdrop>
  )
}
