import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import AuthContextProvider from "./contexts/AuthContext";
import PageRoutes from "./routes/PageRoutes";

function App() {
  return (
    <AuthContextProvider>
        <AppHeader />
        <PageRoutes />
    </AuthContextProvider>
  );
}

export default App;
