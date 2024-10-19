import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';
import { Link } from 'react-router-dom';
  
  export function AuthenticationTitle() {
    return (
      <Container size={420} my={40}>
        <Title ta="center" >
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Link to="/register" style={{ color: 'var(--mantine-primary-color)' }}>
            Sign up
            </Link>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    );
  }