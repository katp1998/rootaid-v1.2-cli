import { User } from '../types/user.type';
import {useState,useEffect} from 'react';
import React from 'react';
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext';
import authService from '../api/authService'

import {Box, Typography, TextField, Button} from '@mui/material/';

import styles from '../styles/Home.module.css'

const loginForm: React.FC = () => {

  const [fields,setFields] = useState({
    email:'',
    password: ''
  }) 

  const {setUserStore,setError,reset,isError,errorMessage,isLoggedIn} = useAuth()
  const router = useRouter()

  useEffect(() => {
    if(isError) {
      setError(errorMessage)
      console.log(errorMessage)
    }
    if(isLoggedIn) {
      router.push('/')
      window.location.reload()
    }
    reset()
  },[isLoggedIn])


  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('') // set error state to empty
  }

  const handleLogin = async (e :any) => {
    e.preventDefault();

    const user : User = {
      email: fields.email as string,
      password: fields.password as string
    }
    try {
      const response = await authService.login(user)
        setUserStore({name:response.name})
        console.log(isLoggedIn)

    } catch (error : any) {
      const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
      setError(message)
    }

  };




  return (
    <>
    <div>
      <form onSubmit={handleLogin}>
        <Box 
        display = "flex" 
        flexDirection={"column"} 
        maxWidth = {400} 
        alignItems="center" 
        justifyContent={"center"} 
        margin="auto" 
        marginTop={5} 
        padding={'50px'} 
        borderRadius={5} 
        boxShadow={'5px 5px 10px #ccc'}
        sx={{":hover":{
          boxShadow:'10px 10px 20px #ccc'
        }}}>
          <Typography 
          variant='h3'
          padding= {3}
          textAlign = "center">LOGIN</Typography>
          <TextField type='email' name="email" value={fields.email}  onChange={onChange} required label="Email" variant="outlined" multiline placeholder='Enter email address' margin='normal' fullWidth color='error' />
          <TextField type="password" name="password" value={fields.password}  onChange={onChange} required label="Password" variant="outlined" multiline placeholder='Enter password' margin="normal" fullWidth color='error' id="outlined-password-input" />
          <Button sx={{marginTop: 3}} variant ="contained"  type="submit" color="error" size="large" fullWidth>Login</Button>  
          <h1>{errorMessage}</h1>
        </Box>

        </form>
    </div>
    </>
  );
};

export default loginForm;