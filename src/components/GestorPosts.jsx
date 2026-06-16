import { useState } from "react";
import usePosts from "../hooks/usePosts";

function obtenerAutor(post) {
  if (post.autor) {
    return post.autor;
  }

  return `Usuario ${post.userId ?? 1}`;
}

function obtenerCategoria(post) {
  return post.categoria ?? "Comunidad";
}

function GestorPosts() {
  const {
    posts,
    postsFiltrados,
    cargando,
    error,
    busqueda,
    setBusqueda,
    agregarPost,
    eliminarPost,
  } = usePosts();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("");

  async function manejarEnvio(evento) {
    evento.preventDefault();

    if (titulo.trim() === "" || contenido.trim() === "") {
      alert("Debe completar el titulo y el contenido.");
      return;
    }

    if (titulo.trim().length < 5) {
      alert("El titulo debe tener minimo 5 caracteres.");
      return;
    }

    if (contenido.trim().length < 10) {
      alert("El contenido debe tener minimo 10 caracteres.");
      return;
    }

    await agregarPost(titulo.trim(), contenido.trim(), autor.trim());

    setTitulo("");
    setContenido("");
    setAutor("");
  }

  async function manejarEliminacion(id) {
    const confirmar = window.confirm(
      "Esta seguro de eliminar esta publicacion?",
    );

    if (confirmar) {
      await eliminarPost(id);
    }
  }

  if (cargando) {
    return (
      <section className="muro">
        <p>Cargando publicaciones de entrenadores...</p>
      </section>
    );
  }

  return (
    <section className="muro">
      <h2>Publicar en PokeMuro</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={manejarEnvio} className="formulario">
        <label htmlFor="titulo">Titulo:</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          placeholder="Ejemplo: Mejor equipo para viajar por Kanto"
        />

        <label htmlFor="contenido">Contenido:</label>
        <textarea
          id="contenido"
          value={contenido}
          onChange={(evento) => setContenido(evento.target.value)}
          placeholder="Comparte una guia, consejo o experiencia de entrenador"
          rows="4"
        />

        <label htmlFor="autor">Autor:</label>
        <input
          id="autor"
          type="text"
          value={autor}
          onChange={(evento) => setAutor(evento.target.value)}
          placeholder="Ejemplo: Entrenador de Quito"
        />

        <button type="submit">Publicar consejo</button>
      </form>

      <hr />

      <div className="cabecera-lista">
        <div>
          <h3>Publicaciones de entrenadores</h3>
          <p>Total de publicaciones: {posts.length}</p>
        </div>

        <label className="buscador" htmlFor="busqueda">
          Buscar:
          <input
            id="busqueda"
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Buscar por titulo, autor, categoria o contenido"
          />
        </label>
      </div>

      {postsFiltrados.length === 0 ? (
        <p>No existen publicaciones.</p>
      ) : (
        <div className="lista-posts">
          {postsFiltrados.map((post) => (
            <article className="post" key={post.id}>
              <div className="post-cabecera">
                <div>
                  <span className="categoria">{obtenerCategoria(post)}</span>
                  <h4>{post.title}</h4>
                </div>
                <span className="autor">{obtenerAutor(post)}</span>
              </div>

              <p>{post.body}</p>

              <button
                className="btn-eliminar"
                onClick={() => manejarEliminacion(post.id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default GestorPosts;
