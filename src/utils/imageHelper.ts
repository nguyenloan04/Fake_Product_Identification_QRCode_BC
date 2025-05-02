export const normalizeName = (title: string,category: string) => {
  title = title
    .toLowerCase()
    .normalize("NFD")                // chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu tiếng Việt
    .replace(/[^a-z0-9]/gi, "")      // bỏ ký tự đặc biệt
    .trim();
  category = category.toLowerCase()
    .normalize("NFD")                // chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu tiếng Việt
    .replace(/[^a-z0-9]/gi, "")      // bỏ ký tự đặc biệt
    .trim();
  return `${title}-${category}`;
};

export const getProductImage = (title: string, category: string) => {
  const fileName = normalizeName(title,category);
  return `/images/products/${fileName}.jpg`;
};
