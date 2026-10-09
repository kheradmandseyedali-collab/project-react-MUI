import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="text-8xl font-black text-brand-500/20">404</div>
      <h1 className="mt-3 text-3xl font-extrabold dark:text-white">
        Lost in the cosmos?
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        This page wandered somewhere else.
      </p>
      <Link to="/">
        <Button className="mt-6">Back to overview →</Button>
      </Link>
    </div>
  );
}
