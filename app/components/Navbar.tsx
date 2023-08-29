import { type PropsWithChildren } from "react";

export function Navbar({ children }: PropsWithChildren) {
  return (
    <div className="navbar sticky top-0 z-10 justify-between bg-neutral text-neutral-content">
      {children}
    </div>
  );
}
