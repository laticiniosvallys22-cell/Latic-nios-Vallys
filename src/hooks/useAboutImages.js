"use client";

import { useCallback, useEffect, useState } from "react";
import { getAboutImages } from "@/services/firebase";

export function useAboutImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAboutImages();
      setImages(data);
    } catch (requestError) {
      setError(requestError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      reload();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [reload]);

  return { images, loading, error, reload };
}
