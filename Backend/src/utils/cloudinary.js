const { v2: cloudinary } = require("cloudinary");
const fs = require("fs/promises");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function ensureCloudinaryConfig() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    const error = new Error("Configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET no .env");
    error.status = 500;
    throw error;
  }
}

function getImageExtension(file) {
  const extensionByMime = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
  };

  return extensionByMime[file.mimetype] || path.extname(file.originalname || "") || ".jpg";
}

async function saveProfilePhotoLocally(file, userId) {
  const uploadDir = path.join(__dirname, "../../uploads/profile");
  const fileName = `user-${userId}-${Date.now()}${getImageExtension(file)}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(filePath, file.buffer);

  return { secure_url: `/uploads/profile/${fileName}` };
}

async function saveBlogImageLocally(file) {
  const uploadDir = path.join(__dirname, "../../uploads/blogs");
  const fileName = `blog-${Date.now()}-${Math.round(Math.random() * 1e9)}${getImageExtension(file)}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(filePath, file.buffer);

  return { secure_url: `/uploads/blogs/${fileName}` };
}

async function uploadProfilePhoto(file, userId) {
  try {
    return await uploadProfilePhotoToCloudinary(file, userId);
  } catch (error) {
    console.error("Cloudinary profile upload failed, saving locally:", error.message);
    return saveProfilePhotoLocally(file, userId);
  }
}

function uploadProfilePhotoToCloudinary(file, userId) {
  ensureCloudinaryConfig();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "slothbee/perfis",
        public_id: `user-${userId}`,
        overwrite: true,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
}

async function uploadBlogImage(file) {
  try {
    return await uploadBlogImageToCloudinary(file);
  } catch (error) {
    console.error("Cloudinary blog upload failed, saving locally:", error.message);
    return saveBlogImageLocally(file);
  }
}

function uploadBlogImageToCloudinary(file) {
  ensureCloudinaryConfig();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "slothbee/blogs",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
}

async function deleteProfilePhoto(userId, photoUrl = "") {
  if (photoUrl && !photoUrl.startsWith("http")) {
    const relativePath = photoUrl.replace(/^\/+/, "");
    const filePath = path.join(__dirname, "../..", relativePath);
    await fs.unlink(filePath).catch(() => {});
    return;
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return;
  }

  await cloudinary.uploader.destroy(`slothbee/perfis/user-${userId}`, {
    resource_type: "image",
  });
}

module.exports = { uploadProfilePhoto, uploadBlogImage, deleteProfilePhoto };
