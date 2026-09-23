"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import ProductCard from "./ProductCard";
import styles from "./ProductBrowser.module.css";

type Sort = "curadoria" | "menor" | "maior";

export default function ProductBrowser({ products, tone = "light" }: { products: Product[]; tone?: "light" | "dark" }) {
  const [brand, setBrand] = useState<string>("todas");
  const [sort, setSort] = useState<Sort>("curadoria");

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), [products]);

  const visible = useMemo(() => {
    const list = brand === "todas" ? [...products] : products.filter((p) => p.brand === brand);
    if (sort === "menor") list.sort((a, b) => a.price_brl - b.price_brl);
    if (sort === "maior") list.sort((a, b) => b.price_brl - a.price_brl);
    return list;
  }, [products, brand, sort]);

  return (
    <div>
      <div className={styles.toolbar}>
        {brands.length > 1 && (
          <div className={styles.chips} role="group" aria-label="Filtrar por marca">
            {["todas", ...brands].map((b) => (
              <button
                key={b}
                type="button"
                className={`${styles.chip} ${brand === b ? styles.chipActive : ""}`}
                aria-pressed={brand === b}
                onClick={() => setBrand(b)}
              >
                {b === "todas" ? "Todas as marcas" : b}
              </button>
            ))}
          </div>
        )}
        <label className={styles.sort}>
          <span>Ordenar</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="curadoria">Ordem da curadoria</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </label>
      </div>

      <p className={styles.count} aria-live="polite">
        {visible.length} {visible.length === 1 ? "produto" : "produtos"}
      </p>

      <div className={styles.grid}>
        {visible.map((p) => (
          <ProductCard key={p.handle} product={p} tone={tone} />
        ))}
      </div>
    </div>
  );
}
