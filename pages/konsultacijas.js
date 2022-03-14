import { useState } from "react";

import withAuth from "../components/auth/PrivateRoute";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";

import { useAuth } from "../contexts/AuthContext";
import ConsultationFetcherEdit from "../components/private/ConsultationFetcherEdit";

const SkolotajsPage = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      router.replace("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Button onClick={handleLogout}>Izlogoties</Button>
      <ConsultationFetcherEdit />
    </>
  );
};

export default withAuth(SkolotajsPage);
