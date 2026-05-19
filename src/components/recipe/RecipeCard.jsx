import { Badge, Box, Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";

export default function RecipeCard({ recipe }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);

  return (
    <Box
      overflow="hidden"
      borderRadius="28px"
      bg="whiteAlpha.900"
      boxShadow="0 20px 50px rgba(15, 23, 42, 0.10)"
      border="1px solid"
      borderColor="orange.100"
    >
      <Box position="relative">
        <Image
          src={recipe.image}
          alt={recipe.title}
          h="220px"
          w="full"
          objectFit="cover"
        />
        <Button
          position="absolute"
          top="4"
          right="4"
          borderRadius="full"
          bg={favorite ? "red.500" : "whiteAlpha.900"}
          color={favorite ? "white" : "red.500"}
          onClick={() => toggleFavorite(recipe.id)}
          _hover={{
            bg: favorite ? "red.600" : "orange.50",
          }}
        >
          {favorite ? "♥" : "♡"}
        </Button>
      </Box>

      <Stack p="6" gap="4">
        <Flex justify="space-between" align="center" gap="4" wrap="wrap">
          <Badge colorPalette="orange" rounded="full" px="3" py="1">
            {recipe.category}
          </Badge>
          <Text color="gray.500" fontSize="sm">
            {recipe.totalTimeMinutes} Min.
          </Text>
        </Flex>

        <Box>
          <Heading size="md" color="gray.800">
            {recipe.title}
          </Heading>
          <Text mt="2" color="gray.600">
            {recipe.description}
          </Text>
        </Box>

        <Flex justify="space-between" align="center" gap="3" wrap="wrap">
          <Text color="gray.500" fontSize="sm">
            {recipe.cuisine} • {recipe.difficulty}
          </Text>
          <Button
            as={Link}
            to={`/recipe/${recipe.id}`}
            colorPalette="orange"
            rounded="full"
          >
            Details ansehen
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
