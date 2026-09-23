"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Registra no GA4 cada clique em "Quero este" (links com data-handle), para saber
// quais produtos levam mais gente até a loja.
export default function ProductClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[data-handle]");
      if (!(link instanceof HTMLAnchorElement)) return;
      track("product_click", {
        product_handle: link.dataset.handle,
        product_name: link.dataset.name,
        product_section: link.dataset.section,
        page_path: window.location.pathname,
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
