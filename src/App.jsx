import GestorPosts from "./components/GestorPosts";

function App() {
  return (
    <main className="container">
      <header className="encabezado">
        <p className="etiqueta">Comunidad de entrenadores</p>
        <h1>PokeMuro</h1>
        <p className="descripcion">
          Publica guias, estrategias y hallazgos para entrenadores Pokemon.
        </p>
      </header>

      <GestorPosts />
    </main>
  );
}

export default App;
