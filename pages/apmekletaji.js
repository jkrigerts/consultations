import AttendeesFetcher from "../components/private/AttendeesFetcher";
import withAuth from "../components/auth/PrivateRoute";
import Layout from "../components/private/Layout";

const ApmekletajiPage = () => {
  return <Layout content={<AttendeesFetcher />} />;
};

export default ApmekletajiPage;
