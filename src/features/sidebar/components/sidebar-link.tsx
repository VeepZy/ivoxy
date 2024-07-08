"use client";

import { type LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ForwardRefExoticComponent, type RefAttributes } from "react";

import { Button } from "@/components/ui/button";

interface LinkProps {
    href: string;
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    label: string;
}

const SidebarLink: React.FC<{ link: LinkProps }> = ({ link }) => {
    const pathname = usePathname();
    const Icon = link.icon;

    return (
        <Button
            asChild
            className="w-full justify-start"
            variant={pathname === link.href ? "secondary" : "ghost"}
        >
            <Link href={link.href}>
                <Icon className="mr-2 mt-0.5 h-4 w-4" />
                {link.label}
            </Link>
        </Button>
    );
};

export { SidebarLink };
