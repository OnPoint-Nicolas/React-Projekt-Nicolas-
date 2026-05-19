import { Link } from "react-router-dom";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useFavorites } from "../../hooks/useFavorites";
import AuthPanel from "../auth/AuthPanel";

export default function Navbar() {
  const { favoriteIds } = useFavorites();

  return (
    <Box as="header" position="sticky" top="0" zIndex="10" backdropFilter="blur(12px)">
      <Container maxW="1200px" py="5">
        <Flex
          px={{ base: "4", md: "6" }}
          py="4"
          bg="whiteAlpha.800"
          border="1px solid"
          borderColor="orange.100"
          borderRadius="24px"
          align="center"
          justify="space-between"
          gap="4"
          wrap="wrap"
          boxShadow="0 12px 40px rgba(251, 146, 60, 0.12)"
        >
          <Box as={Link} to="/">
            <Heading size="md" color="orange.500">
              Rezept App
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Kochen, suchen und Favoriten speichern
            </Text>
          </Box>

          <Flex gap="3" wrap="wrap" align="center">
            <Button as={Link} to="/" variant="ghost" rounded="full">
              Home
            </Button>
            <Button as={Link} to="/favorites" variant="ghost" rounded="full">
              Favoriten ({favoriteIds.length})
            </Button>
            <AuthPanel />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
