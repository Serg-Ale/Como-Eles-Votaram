export function generateSlug(nome: string): string {
  if (!nome) return "";

  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function parseSlug(
  slug: string
): { id: string; nameSlug: string } {
  const parts = slug.split("-");

  if (parts.length < 2) {
    return { id: slug, nameSlug: "" };
  }

  const id = `${parts[0]}-${parts[1]}`;
  const nameSlug = parts.slice(2).join("-");

  return { id, nameSlug };
}

export function buildProfileUrl(parlamentar: {
  id: string;
  nome: string;
  camara: boolean;
}): string {
  const slug = generateSlug(parlamentar.nome);
  const chamber = parlamentar.camara ? "deputados" : "senadores";
  return `/${chamber}/${parlamentar.id}-${slug}`;
}
