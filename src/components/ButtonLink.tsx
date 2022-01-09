import {FC} from "react";
import {Link} from "react-router-dom";
import {Button, ButtonProps} from "@mui/material";

export const ButtonLink: FC<ButtonProps<typeof Link>> = (props) => {
  const {children, ...linkProps} = props
  return (
    <Button variant="text" component={Link} {...linkProps}>{children}</Button>
  )
}
