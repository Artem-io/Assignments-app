import React, { useContext } from 'react'
import {login} from '../api/AssignmentsService';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {JwtContext} from '../util/JwtContext';

const Login = () => {
  const { setJwt } = useContext(JwtContext);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const attemptLogin = async (credentials) => {
      try {
        const response = await login(credentials);
        setJwt(response.data);
        navigate('/dashboard');
      } 
      catch (err) {
        console.error("Error during login:", err);
      }
    };

  return (
    <>
    <form onSubmit={form.onSubmit((values) => attemptLogin(values))}>
    <Container size={420} my={40}>
      <Title ta="center"> Welcome back! </Title>

      <Paper withBorder p={22} mt={30} radius="md">

        <TextInput autoComplete='false' label="Username" placeholder="Your username" required radius="md"
        {...form.getInputProps('username')}/>
        <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" 
        {...form.getInputProps('password')}/>

        <Button fullWidth mt="xl" radius="md" type="submit"> Sign in </Button>
      </Paper>
    </Container>
    </form>
    </>
  )
}

export default Login