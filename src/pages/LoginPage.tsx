import React from 'react';
import {Button, Grid, Stack, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useApi} from "../hooks/api";
import {observer} from "mobx-react";
import {Navigate, useNavigate} from "react-router-dom";

type Inputs = {
  username: string;
  password: string;
}

export const Login = observer(() => {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<Inputs>()
  const api = useApi()
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
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container>
        <Grid item xs={4} sx={{
          ml: 'auto',
          mr: 'auto',
          mt: 4,
        }}>
          <Stack
            sx={{
              '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            alignItems="center"
          >
            <TextField
              required
              id="outlined"
              label="LoginPage"
              {...register('username', {required: {value: true, message: 'You should provide a user name'}})}
              error={!!formState.errors.username}
              helperText={formState.errors.username?.message}
              sx={{pb: 1}}
            />
            <TextField
              required
              id="outlined"
              label="Password"
              {...register('password', {required: {value: true, message: 'You should provide a password'}})}
              error={!!formState.errors.password}
              helperText={formState.errors.password?.message}
              sx={{pb: 1}}
            />
            <Button
              type="submit"
              variant="contained"
            >
              LoginPage
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>

  )
})

export const LoginPage = observer(() => {
  const api = useApi()
  return api.isLoggedIn ? <Navigate to="/"/> : <Login/>
})
