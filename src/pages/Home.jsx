import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import recipes from "../data/recipes.json";
import RecipeCard from "../components/recipe/RecipeCard";

const quickFilters = ["Alle", "Vegetarisch", "Vegan", "Glutenfrei", "Schnell"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("Alle");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Alle");
  const [selectedQuickFilter, setSelectedQuickFilter] = useState("Alle");

  const mealTypes = ["Alle", ...new Set(recipes.map((recipe) => recipe.mealType))];
  const difficulties = ["Alle", ...new Set(recipes.map((recipe) => recipe.difficulty))];

  const filteredRecipes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return recipes.filter((recipe) => {
      const matchesSearch =
        normalizedSearch === "" ||
        recipe.title.toLowerCase().includes(normalizedSearch) ||
        recipe.description.toLowerCase().includes(normalizedSearch) ||
        recipe.category.toLowerCase().includes(normalizedSearch) ||
        recipe.cuisine.toLowerCase().includes(normalizedSearch) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(normalizedSearch)
        );

      const matchesMealType =
        selectedMealType === "Alle" || recipe.mealType === selectedMealType;

      const matchesDifficulty =
        selectedDifficulty === "Alle" || recipe.difficulty === selectedDifficulty;

      const matchesQuickFilter =
        selectedQuickFilter === "Alle" ||
        (selectedQuickFilter === "Schnell" && recipe.totalTimeMinutes <= 30) ||
        recipe.dietaryTags.includes(selectedQuickFilter) ||
        recipe.occasion.includes(selectedQuickFilter);

      return (
        matchesSearch &&
        matchesMealType &&
        matchesDifficulty &&
        matchesQuickFilter
      );
    });
  }, [searchTerm, selectedMealType, selectedDifficulty, selectedQuickFilter]);

  const recipeOfTheDay = recipes.reduce((bestRecipe, currentRecipe) =>
    currentRecipe.rating > bestRecipe.rating ? currentRecipe : bestRecipe
  );

  return (
    <Container maxW="1200px" py={{ base: "8", md: "12" }}>
      <Stack gap="8">
        <Box
          p={{ base: "6", md: "10" }}
          borderRadius="36px"
          bgGradient="linear(to-r, orange.400, pink.400)"
          color="white"
          boxShadow="0 24px 60px rgba(251, 146, 60, 0.28)"
        >
          <Badge bg="whiteAlpha.300" color="white" rounded="full" px="4" py="1">
            Heute empfohlen
          </Badge>
          <Heading mt="4" size="2xl" maxW="700px" lineHeight="1.1">
            Finde Rezepte, filtere sie live und speichere deine Favoriten mit einem Herz.
          </Heading>
          <Text mt="4" maxW="720px" fontSize="lg" color="whiteAlpha.900">
            Diese Startseite ist deine Hauptseite: Suche sofort nach Zutaten,
            wahle passende Filter und springe direkt zur Detailseite.
          </Text>
        </Box>

        <Box
          p="6"
          borderRadius="28px"
          bg="white"
          border="1px solid"
          borderColor="orange.100"
          boxShadow="0 16px 40px rgba(15, 23, 42, 0.08)"
        >
          <Text color="gray.500" textTransform="uppercase" fontSize="sm">
            Heute im Fokus
          </Text>
          <Heading mt="2" size="lg" color="gray.800">
            {recipeOfTheDay.title}
          </Heading>
          <Text mt="3" color="gray.600">
            {recipeOfTheDay.description}
          </Text>
          <Flex mt="5" gap="3" wrap="wrap">
            <Badge colorPalette="orange" rounded="full" px="3" py="1">
              {recipeOfTheDay.rating} Bewertung
            </Badge>
            <Badge colorPalette="green" rounded="full" px="3" py="1">
              {recipeOfTheDay.totalTimeMinutes} Minuten
            </Badge>
            <Badge colorPalette="pink" rounded="full" px="3" py="1">
              {recipeOfTheDay.mealType}
            </Badge>
          </Flex>
        </Box>

        <Box
          p="6"
          borderRadius="28px"
          bg="white"
          border="1px solid"
          borderColor="orange.100"
          boxShadow="0 16px 40px rgba(15, 23, 42, 0.08)"
        >
          <Box
            color="gray.500"
            textTransform="uppercase"
            fontSize="sm"
          >
            Interaktive Suche
          </Box>
          <Heading mt="2" size="lg" color="gray.800">
            Suche nach Name, Kategorie oder Zutaten
          </Heading>
          <Box
            as="input"
            mt="5"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Zum Beispiel: Pasta, Avocado oder Curry"
            w="full"
            px="4"
            py="3"
            rounded="full"
            border="1px solid"
            borderColor="orange.200"
            bg="orange.50"
            _focusVisible={{
              outline: "none",
              borderColor: "orange.400",
            }}
          >
          </Box>

          <Flex mt="5" gap="3" wrap="wrap">
            {quickFilters.map((filter) => (
              <Button
                key={filter}
                size="sm"
                rounded="full"
                variant={selectedQuickFilter === filter ? "solid" : "outline"}
                colorPalette="orange"
                onClick={() => setSelectedQuickFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </Flex>
        </Box>

        <Box
          p="6"
          borderRadius="28px"
          bg="whiteAlpha.800"
          border="1px solid"
          borderColor="orange.100"
        >
          <Flex gap="4" wrap="wrap">
            <Box flex="1" minW={{ base: "100%", md: "220px" }}>
              <Text mb="2" color="gray.600" fontWeight="600">
                Mahlzeit
              </Text>
              <Box
                as="select"
                value={selectedMealType}
                onChange={(event) => setSelectedMealType(event.target.value)}
                w="full"
                px="4"
                py="3"
                rounded="full"
                border="1px solid"
                borderColor="orange.200"
                bg="white"
              >
                {mealTypes.map((mealType) => (
                  <option key={mealType} value={mealType}>
                    {mealType}
                  </option>
                ))}
              </Box>
            </Box>

            <Box flex="1" minW={{ base: "100%", md: "220px" }}>
              <Text mb="2" color="gray.600" fontWeight="600">
                Schwierigkeit
              </Text>
              <Box
                as="select"
                value={selectedDifficulty}
                onChange={(event) => setSelectedDifficulty(event.target.value)}
                w="full"
                px="4"
                py="3"
                rounded="full"
                border="1px solid"
                borderColor="orange.200"
                bg="white"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </Box>
            </Box>
          </Flex>
        </Box>

        <Box>
          <Flex justify="space-between" align="center" gap="4" wrap="wrap" mb="5">
            <Box>
              <Heading size="lg" color="gray.800">
                Rezeptubersicht
              </Heading>
              <Text color="gray.600">
                {filteredRecipes.length} Rezepte passen gerade zu deiner Suche.
              </Text>
            </Box>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </SimpleGrid>

          {filteredRecipes.length === 0 ? (
            <Box
              mt="6"
              p="10"
              textAlign="center"
              bg="white"
              borderRadius="28px"
              border="1px dashed"
              borderColor="orange.200"
            >
              <Heading size="md" color="gray.700">
                Kein passendes Rezept gefunden
              </Heading>
              <Text mt="2" color="gray.500">
                Ander die Suche oder setze einen Filter zuruck.
              </Text>
            </Box>
          ) : null}
        </Box>
      </Stack>
    </Container>
  );
}
