import React from 'react';
import {useNavigate} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {api} from "../hooks/api";

type Inputs = {
  username: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<Inputs>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    api.login(data.username, data.password)
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {m: 1, width: '25ch'},
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <TextField
          required
          id="outlined"
          label="Login"
          {...register('username', {required: true})}
        />
        <TextField
          required
          id="outlined"
          label="Password"
          {...register('password', {required: true})}
        />
        {formState.errors.password}
        <Button
          type="submit"
          variant="contained"
        >
          Login
        </Button>
      </div>
    </Box>
  )
}
