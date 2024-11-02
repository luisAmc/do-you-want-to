import { type ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <main className="mx-auto w-full max-w-xl px-2 py-4">
      <div className="flex flex-col gap-y-4">{children}</div>
    </main>
  );
}
