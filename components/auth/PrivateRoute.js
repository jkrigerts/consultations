import { useAuth } from "../../contexts/AuthContext";
import LoginForm from "./LoginForm";
//import { useRouter } from 'next/router'

const withAuth = (Component) => {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)

    const { currentUser } = useAuth();
    //const router = useRouter()
    // If user is not logged in, return login component
    if (!currentUser) {
      //window.location.href = "/login"; //Reloades the page
      //router.push("/login") // Don't work
      //return (<LoginPage />)  // memory leaks
      return <LoginForm />;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
