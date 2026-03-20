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
import { useUser } from "@/firebase";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", roles: ['owner', 'user'] },
  { name: "Programs", icon: Briefcase, href: "/programs", roles: ['owner'] },
  { name: "Production", icon: Factory, href: "/production", roles: ['owner'] },
  { name: "Quality", icon: ShieldCheck, href: "/quality", roles: ['owner'] },
  { name: "Supply Chain", icon: Truck, href: "/supply-chain", roles: ['owner'] },
  { name: "After-Sales", icon: Wrench, href: "/after-sales", roles: ['owner'] },
  { name: "Collaboration", icon: MessageSquare, href: "/collaboration", roles: ['owner'] },
  { name: "Analytics", icon: BarChart3, href: "/analytics", roles: ['owner'] },
  { name: "Integrations", icon: Link2, href: "/integrations", roles: ['owner'] },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { profile } = useUser();

  const filteredItems = navItems.filter(item => 
    !profile || item.roles.includes(profile.role)
  );

  return (
    <aside
      className={cn(
        "flex flex-col sidebar-glass transition-all duration-500 ease-in-out z-40 border-r border-white/5",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center px-6 mb-4">
        <Link href="/dashboard" className="flex items-center gap-3 font-bold text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
            F
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-xl tracking-tight font-bold">FactoryIQ</span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">Intelligence</span>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 overflow-y-auto scrollbar-hide">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30 scale-[1.02]"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-white" : "text-slate-500 group-hover:text-slate-200"
                )}
              />
              {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
              {isActive && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-2 mb-2">
        <div className="h-px bg-white/5 mx-2 mb-4" />
        <Link
          href="/settings"
          className="flex items-center rounded-xl px-3 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <Settings className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span className="ml-3">Settings</span>}
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-500 hover:text-white hover:bg-white/5 px-3 rounded-xl"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <div className="flex items-center">
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-3">Collapse View</span>
            </div>
          )}
        </Button>
      </div>
    </aside>
  );
}