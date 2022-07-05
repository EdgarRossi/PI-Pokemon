import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Home from "./components/home/Home";
import PokemonDetails from "./components/detail/PokemonDetails";
import NavBar from "./components/nav/NavBar";
import PokemonCreate from "./components/pokemonCreate/PokemonCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={NavBar} />
        <Route path="/home" component={Home} />
        <Route exact path="/pokemons/create/create" component={PokemonCreate} />
        <Route exact path="/pokemons/:id" component={PokemonDetails} />
      </div>
    </BrowserRouter>
  );
}

export default App;
