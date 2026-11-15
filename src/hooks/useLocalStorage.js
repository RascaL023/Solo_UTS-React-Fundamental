import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const fallback = typeof initialValue === "function" ? initialValue() : initialValue;

    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? fallback : JSON.parse(stored);
    } catch {
      // Data rusak atau storage diblokir: mulai dari nilai awal, jangan gagalkan render.
      return fallback;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Kuota penuh atau storage diblokir: state tetap hidup selama sesi ini.
    }
  }, [key, value]);

  return [value, setValue];
}
