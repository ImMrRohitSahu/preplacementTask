import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import Home from "./pages/Home";
import AuthContextProvider from "./contexts/AuthContext";
import ApiContextProvider from "./contexts/ApiContext";

function App() {
  return (
    <AuthContextProvider>
      <ApiContextProvider>
        <AppHeader />
        <Home />
      </ApiContextProvider>
    </AuthContextProvider>
  );
}

export default App;
