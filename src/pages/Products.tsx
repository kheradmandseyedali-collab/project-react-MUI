import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product } from "@/types";
import { productService } from "@/services/productService";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import {
  Badge,
  Button,
  Card,
  Empty,
  Input,
  Modal,
  PageHeader,
  Spinner,
} from "@/components/ui";
import { money } from "@/utils";
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [price, setPrice] = useState(1000);
  const [detail, setDetail] = useState<Product | null>(null);
  const add = useCartStore((s) => s.add);
  const notify = useUIStore((s) => s.notify);
  const [params] = useSearchParams();
  useEffect(() => {
    setQuery(params.get("q") || "");
  }, [params]);
  useEffect(() => {
    Promise.all([productService.all(), productService.categories()])
      .then(([p, c]) => {
        setProducts(p);
        setCats(c);
      })
      .catch((e) => setError(e.message || "Could not load products"))
      .finally(() => setLoading(false));
  }, []);
  const filtered = useMemo(() => {
    let p = products.filter(
      (x) =>
        (category === "all" || x.category === category) &&
        x.price <= price &&
        (x.title.toLowerCase().includes(query.toLowerCase()) ||
          x.brand?.toLowerCase().includes(query.toLowerCase())),
    );
    if (sort === "price-asc") p.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") p.sort((a, b) => b.price - a.price);
    if (sort === "rating") p.sort((a, b) => b.rating - a.rating);
    return p;
  }, [products, category, price, query, sort]);
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="DISCOVER SOMETHING GREAT"
        title="The Shop"
        description="Thoughtfully selected products, ready to ship."
        action={<Badge color="green">● {products.length} products</Badge>}
      />
      <Card className="mb-6 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_190px_190px]">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="⌕  Search products or brands..."
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[.04] dark:text-slate-200"
          >
            <option value="all">All categories</option>
            {cats.map((c) => (
              <option key={c} value={c}>
                {c.replaceAll("-", " ")}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[.04] dark:text-slate-200"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">
            Max price
          </span>
          <input
            type="range"
            min="10"
            max="1000"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className="flex-1 accent-indigo-500"
          />
          <span className="w-16 text-right text-xs font-bold text-slate-700 dark:text-slate-200">
            ${price}
          </span>
          <button
            onClick={() => {
              setQuery("");
              setCategory("all");
              setPrice(1000);
              setSort("featured");
            }}
            className="text-xs text-brand-500"
          >
            Reset
          </button>
        </div>
      </Card>
      {error && (
        <Card className="mb-4 p-4 text-sm text-rose-500">
          {error} — Check your internet connection and refresh.
        </Card>
      )}
      {loading ? (
        <div className="flex justify-center py-24 text-brand-500">
          <Spinner />
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <Empty
            icon="⌕"
            title="No products found"
            description="Try changing your search or filters."
          />
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((p, i) => (
            <Card
              key={p.id}
              className="group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <button
                onClick={() => setDetail(p)}
                className="relative block h-52 w-full overflow-hidden bg-slate-100/70 dark:bg-white/[.03]"
              >
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3">
                  <Badge color={i % 5 === 0 ? "red" : "indigo"}>
                    {i % 5 === 0
                      ? `${Math.round(p.discountPercentage)}% OFF`
                      : p.category}
                  </Badge>
                </span>
                <span className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs text-amber-500 shadow">
                  ★ {p.rating.toFixed(1)}
                </span>
              </button>
              <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {p.brand || p.category}
                </p>
                <button
                  onClick={() => setDetail(p)}
                  className="mt-1 block w-full truncate text-left text-sm font-bold text-slate-800 hover:text-brand-500 dark:text-white"
                >
                  {p.title}
                </button>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {money(p.price)}
                  </span>
                  <Badge color={p.stock > 20 ? "green" : "amber"}>
                    {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                  </Badge>
                </div>
                <Button
                  className="mt-4 w-full"
                  disabled={!p.stock}
                  onClick={() => {
                    add(p);
                    notify(`${p.title} added to cart`);
                  }}
                >
                  ＋ Add to cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Modal
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail?.title || "Product details"}
      >
        {detail && (
          <div className="grid gap-6 sm:grid-cols-2">
            <img
              src={detail.thumbnail}
              className="h-64 w-full rounded-2xl bg-slate-50 object-contain p-4 dark:bg-white/[.03]"
            />
            <div>
              <Badge>{detail.category}</Badge>
              <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-300">
                {detail.description}
              </p>
              <p className="mt-4 text-sm">
                ⭐ {detail.rating}{" "}
                <span className="ml-3 text-slate-400">
                  {detail.stock} available
                </span>
              </p>
              <p className="mt-4 text-2xl font-extrabold dark:text-white">
                {money(detail.price)}
              </p>
              <Button
                className="mt-5 w-full"
                onClick={() => {
                  add(detail);
                  notify("Added to cart");
                  setDetail(null);
                }}
              >
                ＋ Add to cart
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
