const blogRepo = require("../repositories/blog.repo");
const { uploadBlogImage } = require("../utils/cloudinary");

function normalizeBlog(blog) {
  if (!blog) return null;

  return {
    id: Number(blog.id),
    title: blog.titulo,
    category: blog.categoria,
    summary: blog.resumo,
    fotoUrl: blog.foto_url,
    createdAt: blog.criado_em,
  };
}

function validateBlogInput(body) {
  const titulo = String(body.titulo || body.title || "").trim();
  const categoria = String(body.categoria || body.category || "").trim();
  const resumo = String(body.resumo || body.summary || "").trim();
  const foto_url = String(body.foto_url || body.fotoUrl || "").trim();

  if (!titulo) return { error: "Informe o titulo do blog" };
  if (titulo.length > 150) return { error: "O titulo deve ter ate 150 caracteres" };
  if (!categoria) return { error: "Informe a categoria do blog" };
  if (categoria.length > 80) return { error: "A categoria deve ter ate 80 caracteres" };
  if (!resumo) return { error: "Informe o resumo do blog" };

  return { titulo, categoria, resumo, foto_url };
}

async function list(req, res, next) {
  try {
    const blogs = await blogRepo.listBlogs();
    res.json({ blogs: blogs.map(normalizeBlog).filter(Boolean) });
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const input = validateBlogInput(req.body);
    if (input.error) return res.status(400).json({ message: input.error });

    if (req.file) {
      const upload = await uploadBlogImage(req.file);
      input.foto_url = upload.secure_url;
    }

    const id = await blogRepo.createBlog(input);
    const blog = await blogRepo.findBlogById(id);

    res.status(201).json({
      blog: normalizeBlog(blog),
    });
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const input = validateBlogInput(req.body);
    if (input.error) return res.status(400).json({ message: input.error });

    if (req.file) {
      const upload = await uploadBlogImage(req.file);
      input.foto_url = upload.secure_url;
    } else if (req.body.keepCurrentImage === "true") {
      delete input.foto_url;
    }

    const updated = await blogRepo.updateBlog(req.params.id, input);
    if (!updated) return res.status(404).json({ message: "Blog nao encontrado" });

    const blog = await blogRepo.findBlogById(req.params.id);
    res.json({ blog: normalizeBlog(blog) });
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    await blogRepo.deleteBlog(req.params.id);
    res.json({ message: "Blog removido" });
  } catch (e) {
    next(e);
  }
}

async function listFavorites(req, res, next) {
  try {
    const favoriteIds = await blogRepo.listFavoriteBlogIds(req.user.id);
    res.json({ favoriteIds });
  } catch (e) {
    next(e);
  }
}

async function toggleFavorite(req, res, next) {
  try {
    const blogId = Number(req.params.id);
    if (!Number.isInteger(blogId) || blogId < 1) {
      return res.status(400).json({ message: "Blog invalido" });
    }

    const favorite = await blogRepo.findFavorite(req.user.id, blogId);

    if (favorite) {
      await blogRepo.removeFavorite(req.user.id, blogId);
    } else {
      await blogRepo.addFavorite(req.user.id, blogId);
    }

    const favoriteIds = await blogRepo.listFavoriteBlogIds(req.user.id);
    res.json({ favorited: !favorite, favoriteIds });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  list,
  create,
  update,
  remove,
  listFavorites,
  toggleFavorite,
};
