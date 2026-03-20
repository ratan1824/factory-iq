"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Factory,
  ShieldCheck,
  Truck,
  Wrench,
  MessageSquare,
  BarChart3,
  Link2,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Programs", icon: Briefcase, href: "/programs" },
  { name: "Production", icon: Factory, href: "/production" },
  { name: "Quality", icon: ShieldCheck, href: "/quality" },
  { name: "Supply Chain", icon: Truck, href: "/supply-chain" },
  { name: "After-Sales", icon: Wrench, href: "/after-sales" },
  { name: "Collaboration", icon: MessageSquare, href: "/collaboration" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Integrations", icon: Link2, href: "/integrations" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            F
          </div>
          {!isCollapsed && <span className="text-xl tracking-tight">FactoryIQ</span>}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/5 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4 space-y-2">
        <Link
          href="/settings"
          className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <Settings className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span className="ml-3">Settings</span>}
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <div className="flex items-center">
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-3">Collapse</span>
            </div>
          )}
        </Button>
      </div>
    </aside>
  );
}