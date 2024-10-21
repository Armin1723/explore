import {
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
  } from '@mantine/core';
  import classes from './ForgotPassword.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
  
  export function ForgotPassword() {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const handlePasswordReset = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          notifications.clean()
          notifications.show({
            title: "Success",
            message: data.message,
            color: "green",
          });
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage(error.message);
      }
    };

    return (
      <Container size={460} my={30} className=' flex flex-col items-center justify-center'>
        <Title className={classes.title} ta="center">
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Your email" placeholder="me@mantine.dev" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <Group  pt='md'>
              {message && <Text fz={'xs'} c="red">{message}</Text>}
              </Group>
          <Group justify="space-between" mt="lg" className={classes.controls}>
          
            <Anchor c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <Link to="/auth/login" className='flex items-center'>
                <FaArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
                </Link>
              </Center>      
            </Anchor>
            <Button className={classes.control} onClick={handlePasswordReset}>Reset password</Button>
          </Group>
        </Paper>
      </Container>
    );
  }