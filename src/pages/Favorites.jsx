import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import RecipeCard from "../components/recipe/RecipeCard";
import recipes from "../data/recipes.json";
import { useAuth } from "../hooks/useAuth";
import { useFavorites } from "../hooks/useFavorites";

export default function Favorites() {
  const { currentUser, isLoggedIn } = useAuth();
  const { favoriteIds, hasCloudSync } = useFavorites();
  const favoriteRecipes = recipes.filter((recipe) => favoriteIds.includes(recipe.id));

  return (
    <Container maxW="1200px" py={{ base: "8", md: "12" }}>
      <Stack gap="8">
        <Box
          p={{ base: "6", md: "8" }}
          borderRadius="32px"
          bg="white"
          border="1px solid"
          borderColor="orange.100"
          boxShadow="0 16px 40px rgba(15, 23, 42, 0.08)"
        >
          <Heading size="xl" color="gray.800">
            Deine Favoriten
          </Heading>
          <Text mt="3" color="gray.600" maxW="700px">
            Auf dieser Seite findest du alle Rezepte, die du mit einem Herz markiert hast. So kannst du sie jederzeit schnell wiederfinden.
          </Text>
          <Text mt="3" color="gray.500" fontSize="sm">
            {hasCloudSync && currentUser
              ? `Diese Favoriten werden fur ${currentUser.email} in Firebase Firestore gespeichert.`
              : "Melde dich an, damit deine Favoriten benutzerbezogen in Firebase gespeichert werden."}
          </Text>
        </Box>

        {!isLoggedIn ? (
          <Box
            p="8"
            bg="whiteAlpha.800"
            borderRadius="28px"
            border="1px dashed"
            borderColor="orange.200"
            textAlign="center"
          >
            <Heading size="md" color="gray.700">
              Noch nicht eingeloggt
            </Heading>
            <Text mt="2" color="gray.500">
              Logge dich auf der Startseite ein. Dann werden deine Favoriten deinem Firebase-Konto zugeordnet.
            </Text>
          </Box>
        ) : null}

        {favoriteRecipes.length === 0 ? (
          <Box
            p="10"
            bg="whiteAlpha.800"
            borderRadius="28px"
            border="1px dashed"
            borderColor="orange.200"
            textAlign="center"
          >
            <Heading size="md" color="gray.700">
              Noch keine Favoriten gespeichert
            </Heading>
            <Text mt="2" color="gray.500">
              Klicke auf der Startseite auf ein Herz. Dann erscheint das Rezept hier.
            </Text>
          </Box>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="6">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </SimpleGrid>
            <Text textAlign="center" color="gray.500" fontSize="sm">
              Die markierten Rezepte werden in Firebase Firestore gespeichert.
            </Text>
          </>
        )}
      </Stack>
    </Container>
  );
}
