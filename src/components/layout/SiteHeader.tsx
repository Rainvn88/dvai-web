"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ctaLabels, leadHref, mainNav, type NavEntry, type NavGroup } from "@/content/site";

function isGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

function samePath(pathname: string, href: string) {
  const path = href.split(/[?#]/)[0];
  return path === pathname || path === `${pathname}/`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeAll = () => {
    setOpenGroup(null);
    setDrawerOpen(false);
  };

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenGroup(null);
        setDrawerOpen(false);
      }
    }
    document.addEventListener("click", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90"
    >
      <div className="wrap flex h-[66px] items-center gap-5">
        <Link href="/" className="flex-none" onClick={closeAll}>
          <Image
            src="/brand/logo-dvai.png"
            alt="DVAI"
            width={101}
            height={32}
            loading="eager"
            fetchPriority="high"
            className="h-8 w-auto"
          />
        </Link>

        <nav
          id="main-nav"
          aria-label="Menu chính"
          className={`${drawerOpen ? "flex" : "hidden"} absolute inset-x-0 top-full max-h-[calc(100dvh-66px)] flex-col gap-0.5 overflow-auto border-b border-line bg-white px-4 pt-2.5 pb-5 lg:static lg:mx-auto lg:flex lg:max-h-none lg:flex-row lg:items-center lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {mainNav.map((entry) =>
            isGroup(entry) ? (
              <div key={entry.label} className="nav-dd relative">
                <button
                  type="button"
                  className="nav-trigger nav-link w-full justify-between lg:w-auto"
                  aria-expanded={openGroup === entry.label}
                  aria-controls={`menu-${entry.label}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpenGroup((current) => (current === entry.label ? null : entry.label));
                  }}
                >
                  {entry.label}
                  <ChevronDown aria-hidden className="size-3.5 transition-transform" />
                </button>
                <div
                  id={`menu-${entry.label}`}
                  className={`nav-menu ${openGroup === entry.label ? "block" : "hidden"} pb-1.5 pl-2 lg:absolute lg:top-[calc(100%+8px)] lg:-left-2 lg:w-[380px] lg:rounded-[14px] lg:border lg:border-line lg:bg-white lg:p-2 lg:shadow-[0_18px_40px_rgb(7_43_78/0.13)]`}
                >
                  {entry.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      aria-current={samePath(pathname, item.href) ? "page" : undefined}
                      className="block rounded-[9px] px-3 py-2.5 hover:bg-bg focus-visible:bg-bg"
                    >
                      <span className="block text-[14.5px] font-semibold text-navy">{item.label}</span>
                      {item.desc && <span className="block text-[13px] leading-snug text-muted">{item.desc}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                onClick={closeAll}
                aria-current={samePath(pathname, entry.href) ? "page" : undefined}
                className="nav-link"
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex flex-none items-center gap-3 lg:ml-0">
          <Link href={leadHref("bao-gia")} className="btn btn-primary btn-sm hidden sm:inline-flex" onClick={closeAll}>
            {ctaLabels["bao-gia"]}
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg border border-line text-navy lg:hidden"
            aria-expanded={drawerOpen}
            aria-controls="main-nav"
            aria-label={drawerOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setDrawerOpen((open) => !open)}
          >
            {drawerOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
