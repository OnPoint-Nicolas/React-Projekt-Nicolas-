import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container maxW="800px" py="16">
      <Box
        p="10"
        textAlign="center"
        bg="white"
        borderRadius="28px"
        border="1px solid"
        borderColor="orange.100"
      >
        <Heading color="gray.800">404 - Seite nicht gefunden</Heading>
        <Text mt="3" color="gray.500">
          Diese Seite gibt es in deiner Rezept App nicht.
        </Text>
        <Button as={Link} to="/" mt="6" colorPalette="orange" rounded="full">
          Zur Startseite
        </Button>
      </Box>
    </Container>
  );
}
