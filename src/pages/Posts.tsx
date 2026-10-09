import { useEffect, useMemo, useState } from "react";
import type { Post } from "@/types";
import { postService } from "@/services/postService";
import { useAuthStore } from "@/store/authStore";
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
export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const user = useAuthStore((s) => s.user);
  const notify = useUIStore((s) => s.notify);
  useEffect(() => {
    postService
      .all()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  const shown = useMemo(
    () =>
      posts.filter((p) =>
        (p.title + " " + p.body + " " + p.tags.join(" "))
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [posts, query],
  );
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    try {
      const post = await postService.create({
        title,
        body,
        userId: user?.id || 1,
      });
      setPosts((p) => [post, ...p]);
      setModal(false);
      setTitle("");
      setBody("");
      notify("Your post was published!");
    } catch {
      const local: Post = {
        id: Date.now(),
        title,
        body,
        tags: ["community", "update"],
        reactions: 0,
        userId: user?.id || 1,
      };
      setPosts((p) => [local, ...p]);
      setModal(false);
      notify("Post added to demo feed");
    }
  };
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="THE NOVA COMMUNITY"
        title="Ideas & updates"
        description="A little inspiration from your community."
        action={<Button onClick={() => setModal(true)}>＋ Create post</Button>}
      />
      <div className="mb-6 max-w-md">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="⌕  Search ideas, tags, and updates..."
        />
      </div>
      {error && (
        <Card className="mb-4 p-4 text-sm text-rose-500">
          Could not connect to the community API. Showing available demo posts.
        </Card>
      )}
      {loading ? (
        <div className="flex justify-center py-20 text-brand-500">
          <Spinner />
        </div>
      ) : shown.length === 0 ? (
        <Card>
          <Empty
            icon="✎"
            title="No stories yet"
            description="Start the conversation and share your first update."
          />
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((p, i) => (
            <Card
              key={p.id}
              className="flex flex-col p-5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`https://i.pravatar.cc/100?img=${((p.userId * 7) % 70) + 1}`}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    {p.userId === user?.id
                      ? "You"
                      : [
                          "Olivia Rhye",
                          "Phoenix Baker",
                          "Lana Steiner",
                          "Demi Wilkinson",
                        ][i % 4]}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {i + 1}h ago · Community
                  </p>
                </div>
                <button className="text-slate-400">···</button>
              </div>
              <button onClick={() => setDetail(p)} className="mt-5 text-left">
                <h3 className="line-clamp-2 text-lg font-extrabold text-slate-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {p.body}
                </p>
              </button>
              <div className="mt-4 flex flex-wrap gap-2">
                {(p.tags || []).map((t) => (
                  <Badge key={t} color={t.length % 2 ? "violet" : "indigo"}>
                    #{t}
                  </Badge>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/[.06]">
                <div className="flex gap-4 text-xs text-slate-400">
                  <button
                    onClick={() => notify("Thanks for reacting!", "info")}
                    className="hover:text-rose-500"
                  >
                    ♡{" "}
                    {typeof p.reactions === "number"
                      ? p.reactions
                      : p.reactions?.likes || 0}
                  </button>
                  <button onClick={() => setDetail(p)}>◷ Read more</button>
                </div>
                <span className="text-xs text-slate-400">↗ Share</span>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Share an update"
      >
        <form onSubmit={submit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post a title"
            required
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What’s on your mind?"
            rows={5}
            required
            className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm outline-none focus:border-brand-400 dark:border-white/10 dark:bg-white/[.04] dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setModal(false)}
            >
              Cancel
            </Button>
            <Button>Publish post →</Button>
          </div>
        </form>
      </Modal>
      <Modal
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail?.title || "Post"}
      >
        {detail && (
          <>
            <p className="whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
              {detail.body}
            </p>
            <div className="mt-5 flex gap-2">
              {detail.tags?.map((t) => (
                <Badge key={t}>#{t}</Badge>
              ))}
            </div>
            <button
              onClick={() => notify("Thanks for reacting!", "info")}
              className="mt-5 rounded-xl bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-500"
            >
              ♡ React to this post
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}
