import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import * as backend from "../lib/backend";
import { getFavorites, toggleFavorite as toggleFav } from "../lib/favorites";
import type { Property, PropertyFilter } from "../types/property";

export function useProperties(filter: PropertyFilter = {}) {
  return useQuery<Property[]>({
    queryKey: ["properties", filter],
    queryFn: () => backend.getProperties(filter),
    staleTime: 1000 * 60 * 2,
  });
}

export function useProperty(id: number | undefined) {
  return useQuery<Property | undefined>({
    queryKey: ["property", id],
    queryFn: () => (id !== undefined ? backend.getProperty(id) : undefined),
    enabled: id !== undefined,
    staleTime: 1000 * 60 * 5,
  });
}

export function useRecommended(limit = 4) {
  return useQuery<Property[]>({
    queryKey: ["recommended", limit],
    queryFn: () => backend.getRecommended(limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useFeatured() {
  return useQuery<Property[]>({
    queryKey: ["featured"],
    queryFn: () => backend.getFeatured(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() =>
    getFavorites(),
  );

  // Sync across tabs
  useEffect(() => {
    const handler = () => setFavoriteIds(getFavorites());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const toggle = useCallback((id: number) => {
    toggleFav(id);
    setFavoriteIds(getFavorites());
  }, []);

  const isFav = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds],
  );

  return { favoriteIds, toggle, isFav };
}

export function useFavoriteProperties() {
  const { favoriteIds } = useFavorites();
  return useQuery<Property[]>({
    queryKey: ["favoriteProperties", favoriteIds],
    queryFn: async () => {
      const all = await backend.getProperties({});
      return all.filter((p) => favoriteIds.includes(p.id));
    },
    staleTime: 1000 * 60 * 2,
  });
}
