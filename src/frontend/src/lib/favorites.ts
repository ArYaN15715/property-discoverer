const STORAGE_KEY = "pd_favorites";

export function getFavorites(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

export function addFavorite(id: number): void {
  const favs = getFavorites();
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  }
}

export function removeFavorite(id: number): void {
  const favs = getFavorites().filter((f) => f !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function isFavorite(id: number): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: number): boolean {
  if (isFavorite(id)) {
    removeFavorite(id);
    return false;
  }
  addFavorite(id);
  return true;
}
