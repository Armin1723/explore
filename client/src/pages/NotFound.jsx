import React from 'react';
import { useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Container, Title, Text, Button } from '@mantine/core';

const NotFound = () => {
  const theme = useMantineTheme();

  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[3],
        color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.black,
      }}
      fluid
    >
      <div style={{ textAlign: 'center' }}>
        <Title order={1} size={90} weight={900} color='blue.6'>
          404
        </Title>
        <Title order={2} mt="md">
          Oops! Page not found.
        </Title>
        <Text mt="md" size="lg">
          The page you are looking for doesn't exist or has been moved.
        </Text>
        <Link to="/">
          <Button
            mt="lg"
            size="lg"
            color="blue"
          >
            Go Back Home
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
