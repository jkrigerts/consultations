import { useState } from "react";

import AttendeesFetcher from "../components/private/AttendeesFetcher";
import withAuth from "../components/auth/PrivateRoute";
import { Button, LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";

import { useAuth } from "../contexts/AuthContext";

const ApmekletajiPage = () => {
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
      <AttendeesFetcher />
    </>
  );
};

export default withAuth(ApmekletajiPage);
