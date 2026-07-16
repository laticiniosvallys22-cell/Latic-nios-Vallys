"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "@/services/firebase";

const defaultSettings = {
  heroStyle: "style1",
  productsStyle: "style1",
  aboutStyle: "style1",
  fontFamily: "inter", // inter, roboto, playfair
};

const SettingsContext = createContext({
  settings: defaultSettings,
  loading: true,
  setSettings: () => {},
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSettings();
        if (data) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Failed to load settings from Firebase:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, setSettings }}>
      <div className={`font-${settings.fontFamily}`}>{children}</div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
