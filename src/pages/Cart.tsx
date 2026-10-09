import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Empty, Input, PageHeader, Badge } from "@/components/ui";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { money } from "@/utils";
export default function Cart() {
  const { items, update, remove, clear } = useCartStore();
  const notify = useUIStore((s) => s.notify);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const apply = () => {
    if (coupon.trim().toUpperCase() === "NOVA10") {
      setDiscount(10);
      notify("Coupon NOVA10 applied — 10% off!");
    } else {
      setDiscount(0);
      notify("Try the demo code NOVA10", "error");
    }
  };
  const checkout = () => {
    notify("Checkout demo complete — thank you!");
    clear();
    setDiscount(0);
  };
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="YOUR SELECTION"
        title="Shopping cart"
        description="Everything you’ve picked out, all in one place."
        action={
          <Link to="/products" className="text-sm font-semibold text-brand-500">
            ← Continue shopping
          </Link>
        }
      />
      {items.length === 0 ? (
        <Card>
          <Empty
            icon="🛍️"
            title="Your cart is taking a little break"
            description="Find something you love in the shop and it will show up here."
          >
            <Link to="/products" />
          </Empty>
          <div className="pb-8 text-center">
            <Link to="/products">
              <Button>Browse the shop →</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_350px]">
          <div className="space-y-3">
            {items.map(({ product: p, quantity: q }) => (
              <Card
                key={p.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={p.thumbnail}
                  className="h-24 w-24 rounded-xl bg-slate-50 object-contain p-2 dark:bg-white/[.04]"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase text-slate-400">
                    {p.brand || p.category}
                  </p>
                  <h3 className="mt-1 truncate font-bold text-slate-800 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm font-bold text-brand-500">
                    {money(p.price)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-white/10">
                    <button
                      onClick={() =>
                        q <= 1 ? remove(p.id) : update(p.id, q - 1)
                      }
                      className="px-3 py-2 text-slate-500"
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm font-bold dark:text-white">
                      {q}
                    </span>
                    <button
                      onClick={() => update(p.id, q + 1)}
                      className="px-3 py-2 text-slate-500"
                    >
                      ＋
                    </button>
                  </div>
                  <span className="w-20 text-right text-sm font-extrabold dark:text-white">
                    {money(p.price * q)}
                  </span>
                  <button
                    onClick={() => remove(p.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10"
                  >
                    ✕
                  </button>
                </div>
              </Card>
            ))}
          </div>
          <Card className="sticky top-24 p-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Order summary
            </h2>
            <div className="mt-5 flex gap-2">
              <Input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
              />
              <Button variant="secondary" onClick={apply}>
                Apply
              </Button>
            </div>
            <p className="mt-2 text-[10px] text-slate-400">
              Try{" "}
              <button
                onClick={() => setCoupon("NOVA10")}
                className="font-bold text-brand-500"
              >
                NOVA10
              </button>{" "}
              for 10% off
            </p>
            <div className="mt-6 space-y-3 border-b border-slate-100 pb-5 text-sm dark:border-white/[.07]">
              <div className="flex justify-between text-slate-500">
                <span>
                  Subtotal ({items.reduce((n, i) => n + i.quantity, 0)} items)
                </span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-500">Free</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-500">
                  <span>Discount ({discount}%)</span>
                  <span>−{money((subtotal * discount) / 100)}</span>
                </div>
              )}
            </div>
            <div className="mt-5 flex justify-between text-lg font-extrabold text-slate-900 dark:text-white">
              <span>Total</span>
              <span>{money(subtotal * (1 - discount / 100))}</span>
            </div>
            <Button onClick={checkout} className="mt-6 w-full py-3">
              Secure checkout →
            </Button>
            <div className="mt-4 flex justify-center gap-2">
              <Badge color="gray">🔒 Secure</Badge>
              <Badge color="gray">↩ Easy returns</Badge>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
