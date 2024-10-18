import Layout from "./components/Layout";
import Hero from "./components/Hero";
import CoffeForm from "./components/CoffeeForm";
import Stats from "./components/Stats";
import History from "./components/History";
import { useAuth } from "./context/AuthContext";

function App() {
  const { globalUser, globalData, isLoading } = useAuth();
  const isAuthenticated = globalUser;

  //if there is globalData and length is greater than 0 (0 is false)
  const isData = globalData && !!Object.keys(globalData || {}).length;

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  );

  return (
    <Layout>
      <Hero />
      <CoffeForm isAuthenticated={isAuthenticated} />
      {isAuthenticated && isLoading && <p>Loading Data...</p>}
      {isAuthenticated && isData && authenticatedContent}
    </Layout>
  );
}

export default App;
