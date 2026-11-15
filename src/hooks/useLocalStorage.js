import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue, isValid) {
  const [value, setValue] = useState(() => {
    const fallback = typeof initialValue === "function" ? initialValue() : initialValue;

    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return fallback;

      const parsed = JSON.parse(stored);

      // Nilai valid JSON yang bentuknya sudah usang juga diganti, bukan dipakai mentah.
      return isValid && !isValid(parsed) ? fallback : parsed;
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
