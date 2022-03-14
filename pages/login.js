import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/auth/LoginForm";

function LoginPage() {
  const [isLoadingLogin, setIsLoadingLogin] = useState(true);
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      router.replace("/apmekletaji");
    } else {
      setIsLoadingLogin(false);
    }
  }, [router, currentUser]);

  if (isLoadingLogin) {
    return <div className="loading">Lādējas... :)</div>;
  }

  return <LoginForm />;
}

export default LoginPage;
