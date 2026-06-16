import { useEffect, useMemo, useState } from "react";
import publicacionesPokemon from "../data/publicacionesPokemon";
import { crearPost, eliminarPostApi, obtenerPosts } from "../services/postService";

function obtenerAutor(post) {
  if (post.autor) {
    return post.autor;
  }

  return `Usuario ${post.userId ?? 1}`;
}

function obtenerCategoria(post) {
  return post.categoria ?? "Comunidad";
}

function usePosts() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargarPosts() {
      try {
        setCargando(true);
        setError(null);

        const datos = await obtenerPosts();
        const publicacionesIniciales = publicacionesPokemon.map((post, index) => ({
          ...post,
          id: datos[index]?.id ?? post.id,
          userId: datos[index]?.userId ?? post.userId,
        }));

        setPosts(publicacionesIniciales);
      } catch {
        setError("No se pudieron cargar las publicaciones.");
      } finally {
        setCargando(false);
      }
    }

    cargarPosts();
  }, []);

  const postsFiltrados = useMemo(() => {
    const textoBusqueda = busqueda.trim().toLowerCase();

    if (textoBusqueda === "") {
      return posts;
    }

    return posts.filter((post) => {
      const titulo = post.title.toLowerCase();
      const contenido = post.body.toLowerCase();
      const autor = obtenerAutor(post).toLowerCase();
      const categoria = obtenerCategoria(post).toLowerCase();

      return (
        titulo.includes(textoBusqueda) ||
        contenido.includes(textoBusqueda) ||
        autor.includes(textoBusqueda) ||
        categoria.includes(textoBusqueda)
      );
    });
  }, [busqueda, posts]);

  async function agregarPost(titulo, contenido, autor) {
    const nuevoPost = {
      id: Date.now(),
      title: titulo,
      body: contenido,
      autor: autor || "Autor anonimo",
      categoria: "Comunidad",
      userId: 1,
    };

    try {
      const postCreado = await crearPost(nuevoPost);
      setPosts((postsActuales) => [{ ...postCreado, ...nuevoPost }, ...postsActuales]);
    } catch {
      setError("No se pudo crear la publicacion.");
    }
  }

  async function eliminarPost(id) {
    try {
      await eliminarPostApi(id);
      setPosts((postsActuales) =>
        postsActuales.filter((post) => post.id !== id),
      );
    } catch {
      setError("No se pudo eliminar la publicacion.");
    }
  }

  return {
    posts,
    postsFiltrados,
    cargando,
    error,
    busqueda,
    setBusqueda,
    agregarPost,
    eliminarPost,
  };
}

export default usePosts;
