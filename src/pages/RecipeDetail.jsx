import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import recipes from "../data/recipes.json";
import { useFavorites } from "../hooks/useFavorites";

function parseFraction(value) {
  if (value.includes("/")) {
    const [numerator, denominator] = value.split("/").map(Number);

    if (!Number.isNaN(numerator) && !Number.isNaN(denominator) && denominator !== 0) {
      return numerator / denominator;
    }
  }

  const normalizedValue = value.replace(",", ".");
  const parsedValue = Number(normalizedValue);

  return Number.isNaN(parsedValue) ? null : parsedValue;
}

function formatQuantity(value) {
  const roundedValue = Math.round(value * 100) / 100;

  if (Number.isInteger(roundedValue)) {
    return String(roundedValue);
  }

  return roundedValue.toFixed(2).replace(/\.?0+$/, "");
}

function scaleIngredient(ingredient, factor) {
  const match = ingredient.match(/^(\d+(?:[.,]\d+)?|\d+\/\d+)\s*([A-Za-zÄÖÜäöüß]+)?\s*(.*)$/);

  if (!match) {
    return ingredient;
  }

  const [, rawAmount, rawUnit = "", rawName = ""] = match;
  const amount = parseFraction(rawAmount);

  if (amount === null) {
    return ingredient;
  }

  const scaledAmount = formatQuantity(amount * factor);
  const normalizedUnit = rawUnit.trim();
  const normalizedName = rawName.trim();

  return [scaledAmount, normalizedUnit, normalizedName].filter(Boolean).join(" ");
}

export default function RecipeDetail() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const recipe = recipes.find((r) => r.id === Number(id));
  const [servings, setServings] = useState(recipe?.servings ?? 1);

  if (!recipe) {
    return (
      <Container maxW="900px" py="16">
        <Box bg="white" p="10" borderRadius="28px" textAlign="center">
          <Heading size="md">Rezept nicht gefunden</Heading>
          <Button as={Link} to="/" mt="5" colorPalette="orange" rounded="full">
            Zuruck zur Startseite
          </Button>
        </Box>
      </Container>
    );
  }

  const scalingFactor = servings / recipe.servings;

  const scaledIngredients = recipe.ingredients.map((ingredient) =>
    scaleIngredient(ingredient, scalingFactor)
  );

  return (
    <Container maxW="1200px" py={{ base: "8", md: "12" }}>
      <Stack gap="8">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="8">
          <Box>
            <Image
              src={recipe.image}
              alt={recipe.title}
              w="full"
              h={{ base: "280px", md: "420px" }}
              objectFit="cover"
              borderRadius="32px"
              boxShadow="0 20px 50px rgba(15, 23, 42, 0.14)"
            />
          </Box>

          <Stack gap="5">
            <Flex gap="3" wrap="wrap">
              <Badge colorPalette="orange" rounded="full" px="3" py="1">
                {recipe.category}
              </Badge>
              <Badge colorPalette="green" rounded="full" px="3" py="1">
                {recipe.mealType}
              </Badge>
              <Badge colorPalette="pink" rounded="full" px="3" py="1">
                {recipe.cuisine}
              </Badge>
            </Flex>

            <Heading size="2xl" color="gray.800">
              {recipe.title}
            </Heading>
            <Text color="gray.600" fontSize="lg">
              {recipe.description}
            </Text>

            <Flex gap="3" wrap="wrap">
              <Badge rounded="full" px="3" py="1">
                {recipe.totalTimeMinutes} Minuten
              </Badge>
              <Badge rounded="full" px="3" py="1">
                {recipe.difficulty}
              </Badge>
              <Badge rounded="full" px="3" py="1">
                Fur {servings} Portionen
              </Badge>
              <Badge rounded="full" px="3" py="1">
                Bewertung {recipe.rating}
              </Badge>
            </Flex>

            <Flex gap="3" wrap="wrap">
              <Button
                rounded="full"
                colorPalette={isFavorite(recipe.id) ? "red" : "orange"}
                onClick={() => toggleFavorite(recipe.id)}
              >
                {isFavorite(recipe.id) ? "♥ Favorit entfernen" : "♡ Zu Favoriten"}
              </Button>
              <Button as={Link} to="/" variant="outline" rounded="full">
                Zur Startseite
              </Button>
            </Flex>

            <Box
              p="5"
              bg="orange.50"
              borderRadius="24px"
              border="1px solid"
              borderColor="orange.100"
            >
              <Text fontWeight="700" color="gray.800">
                Portions-Skalierer
              </Text>
              <Text mt="1" color="gray.600" fontSize="sm">
                Erhohe oder verringere die Portionen. Die Zutaten passen sich automatisch an.
              </Text>
              <Flex mt="4" align="center" gap="3" wrap="wrap">
                <Button
                  rounded="full"
                  variant="outline"
                  onClick={() => setServings((current) => Math.max(1, current - 1))}
                >
                  - 1
                </Button>
                <Box
                  minW="90px"
                  textAlign="center"
                  px="4"
                  py="2"
                  bg="white"
                  borderRadius="full"
                  fontWeight="700"
                  color="orange.500"
                >
                  {servings}
                </Box>
                <Button
                  rounded="full"
                  colorPalette="orange"
                  onClick={() => setServings((current) => current + 1)}
                >
                  + 1
                </Button>
                <Text color="gray.500" fontSize="sm">
                  Originalrezept: {recipe.servings} Portionen
                </Text>
              </Flex>
            </Box>
          </Stack>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="8">
          <Box
            p={{ base: "6", md: "8" }}
            bg="white"
            borderRadius="28px"
            border="1px solid"
            borderColor="orange.100"
          >
            <Heading size="lg" color="gray.800">
              Zutaten
            </Heading>
            <Stack mt="5" gap="3">
              {scaledIngredients.map((ingredient) => (
                <Box
                  key={ingredient}
                  px="4"
                  py="3"
                  rounded="2xl"
                  bg="orange.50"
                  color="gray.700"
                >
                  {ingredient}
                </Box>
              ))}
            </Stack>
          </Box>

          <Box
            p={{ base: "6", md: "8" }}
            bg="white"
            borderRadius="28px"
            border="1px solid"
            borderColor="orange.100"
          >
            <Heading size="lg" color="gray.800">
              Zubereitung
            </Heading>
            <Stack mt="5" gap="4">
              {recipe.steps.map((step, index) => (
                <Flex key={step} gap="4" align="start">
                  <Flex
                    minW="36px"
                    h="36px"
                    align="center"
                    justify="center"
                    rounded="full"
                    bg="orange.400"
                    color="white"
                    fontWeight="700"
                  >
                    {index + 1}
                  </Flex>
                  <Text color="gray.700" pt="1">
                    {step}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Box>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
