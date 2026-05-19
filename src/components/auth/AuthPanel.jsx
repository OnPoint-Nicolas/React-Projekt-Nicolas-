import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function mapAuthError(errorCode) {
  const errorMap = {
    "auth/email-already-in-use": "Diese E-Mail wird bereits verwendet.",
    "auth/invalid-email": "Die E-Mail-Adresse ist nicht gueltig.",
    "auth/weak-password": "Das Passwort ist zu kurz. Nimm mindestens 6 Zeichen.",
    "auth/invalid-credential": "E-Mail oder Passwort ist nicht richtig.",
    "auth/popup-closed-by-user": "Das Google-Fenster wurde geschlossen.",
  };

  return errorMap[errorCode] ?? "Die Anmeldung hat gerade nicht funktioniert.";
}

export default function AuthPanel() {
  const {
    currentUser,
    signInWithEmail,
    signInWithGooglePopup,
    signOutUser,
    signUpWithEmail,
  } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback("");

    try {
      if (mode === "register") {
        await signUpWithEmail(email, password);
        setFeedback("Konto erstellt. Du bist jetzt eingeloggt.");
      } else {
        await signInWithEmail(email, password);
        setFeedback("Login erfolgreich.");
      }

      setPassword("");
      setIsOpen(false);
    } catch (error) {
      setFeedback(mapAuthError(error.code));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setSubmitting(true);
    setFeedback("");

    try {
      await signInWithGooglePopup();
      setFeedback("Google-Login erfolgreich.");
    } catch (error) {
      setFeedback(mapAuthError(error.code));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    setSubmitting(true);
    setFeedback("");

    try {
      await signOutUser();
      setFeedback("Du wurdest ausgeloggt.");
    } catch {
      setFeedback("Logout hat gerade nicht funktioniert.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box position="relative">
      {currentUser ? (
        <Flex align="center" gap="3" wrap="wrap" justify="flex-end">
          <Text color="gray.500" fontSize="sm">
            {currentUser.email}
          </Text>
          <Button
            rounded="full"
            colorPalette="orange"
            variant="outline"
            onClick={handleLogout}
            loading={submitting}
          >
            Logout
          </Button>
        </Flex>
      ) : (
        <>
          <Flex gap="2" justify="flex-end" wrap="wrap">
            <Button
              rounded="full"
              size="sm"
              variant={mode === "login" ? "solid" : "ghost"}
              colorPalette="orange"
              onClick={() => {
                setMode("login");
                setIsOpen((current) => !current || mode !== "login");
              }}
            >
              Login
            </Button>
            <Button
              rounded="full"
              size="sm"
              variant={mode === "register" ? "solid" : "ghost"}
              colorPalette="orange"
              onClick={() => {
                setMode("register");
                setIsOpen((current) => !current || mode !== "register");
              }}
            >
              Registrieren
            </Button>
          </Flex>

          {isOpen ? (
            <Box
              mt="3"
              p="4"
              minW={{ base: "100%", md: "330px" }}
              borderRadius="24px"
              bg="white"
              border="1px solid"
              borderColor="orange.100"
              boxShadow="0 18px 40px rgba(15, 23, 42, 0.10)"
            >
              <Box as="form" onSubmit={handleSubmit}>
                <Stack gap="3">
                  <Text color="gray.600" fontSize="sm">
                    {mode === "register"
                      ? "Erstelle ein Konto fur Firebase."
                      : "Melde dich mit deinem Konto an."}
                  </Text>

                  <Input
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    bg="orange.50"
                    borderRadius="full"
                    borderColor="orange.200"
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    bg="orange.50"
                    borderRadius="full"
                    borderColor="orange.200"
                    required
                  />

                  <Button
                    type="submit"
                    rounded="full"
                    colorPalette="orange"
                    loading={submitting}
                  >
                    {mode === "register" ? "Konto erstellen" : "Einloggen"}
                  </Button>

                  <Button
                    type="button"
                    rounded="full"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    loading={submitting}
                  >
                    Mit Google anmelden
                  </Button>

                  <Text color="gray.500" fontSize="sm">
                    {feedback ||
                      "Nach dem Login werden Favoriten deinem Benutzerkonto zugeordnet."}
                  </Text>
                </Stack>
              </Box>
            </Box>
          ) : null}
        </>
      )}
    </Box>
  );
}
