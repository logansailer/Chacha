import Layout from "./components/Layout";
import Intro from "./components/Intro";
import Form from "./components/Form";
import Stats from "./components/Stats";
import History from "./components/History";
import { useAuth } from "./context/AuthContext";

function App() {
  const { globalUser, globalData, isLoading } = useAuth();
  const isAuthenticated = globalUser;

  //if there is globalData and length is greater than 0 (0 is false)
  const isData = globalData && !!Object.keys(globalData || {}).length;

  const showInfo = (
    <>
      <Intro />
    </>
  );

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  );

  return (
    <Layout>
      {!isAuthenticated && showInfo}
      <Form isAuthenticated={isAuthenticated} />
      {isAuthenticated && isLoading && <p>Loading Data...</p>}
      {isAuthenticated && isData && authenticatedContent}
    </Layout>
  );
}

export default App;
