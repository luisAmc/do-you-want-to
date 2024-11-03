import { useState, type ReactNode } from "react";
import { Drawer as VaulDrawer } from "vaul";
import { cn } from "~/utils/cn";

export function useDrawer() {
  const [open, setOpen] = useState(false);

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    props: {
      open,
      onClose() {
        setOpen(false);
      },
    },
  };
}

interface DrawerProps {
  title?: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Drawer({ title, open, onClose, children }: DrawerProps) {
  return (
    <VaulDrawer.Root open={open} onClose={onClose}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay
          className={cn("fixed inset-0 bg-black/40 z-20")}
          onClick={onClose}
        />

        <VaulDrawer.Content className="z-30 fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-xl">
          <div className="h-full flex-1 rounded-t-xl bg-white p-4 pb-8 overflow-y-auto">
            <div className="mx-auto mb-6 h-2 w-[100px] flex-shrink-0 rounded-full bg-gray-200" />

            <div className="mx-auto w-full max-w-sm">
              {title && (
                <VaulDrawer.Title className="text-xl font-medium">
                  {title}
                </VaulDrawer.Title>
              )}

              <div className="mt-6 flex flex-col gap-y-4">{children}</div>
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
