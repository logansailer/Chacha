import Layout from "./components/Layout";
import Hero from "./components/Hero";
import CoffeForm from "./components/CoffeeForm";
import Stats from "./components/Stats";
import History from "./components/HIstory";
function App() {

  const isAuthenticated = true

  const authenticatedContent = (
    <>
    <Stats />
    <History />
    </>
  )
  

  return (
    <Layout>
      <Hero />
      <CoffeForm />
      {isAuthenticated && (authenticatedContent)}
    </Layout>
  )
}

export default App;
