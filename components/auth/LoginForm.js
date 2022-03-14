import { useForm } from "@mantine/hooks";
import { useState, useRef, useEffect } from "react";
import { TextInput, PasswordInput, Loader, Button, Card } from "@mantine/core";

import { useAuth } from "../../contexts/AuthContext";
import { Container } from "tabler-icons-react";

function LoginForm() {
  const unmounted = useRef(false);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      if (!unmounted.current) {
        setError("");
        setLoading(true);
      }
      await login(form.values.email, form.values.password);
    } catch {
      if (!unmounted.current) {
        setError("Failed to sign in");
      }
    }

    if (!unmounted.current) {
      setLoading(false);
    }
  }

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div
      style={{
        width: 320,
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <Card shadow="sm" p="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label="Tavs epasts"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            label="Tava parole"
            {...form.getInputProps("password")}
          />
          {loading ? (
            <Loader color="teal" style={{ marginTop: 20 }} />
          ) : (
            <Button
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              type="submit"
              style={{ marginTop: 20 }}
            >
              Ielogoties
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;
