import { Container, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Container maxW="1200px" py="10">
      <Text
        textAlign="center"
        color="gray.500"
        fontSize="sm"
        px="4"
      >
        Rezept App © 2026 • Nicolas
      </Text>
    </Container>
  );
}
