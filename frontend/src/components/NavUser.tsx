import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  EllipsisVertical,
  LogOut,
  ReceiptText,
  Settings,
} from "lucide-react";
import { useState } from "react";
import SettingsDialog from "./SettingsDialog";
import useUser from "@/hooks/useUser";

const NavUser = () => {
  const { isMobile } = useSidebar();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { user } = useUser();

  const displayName = user?.name?.trim() || "Guest";
  const displayEmail = user?.email?.trim() || "guest@guest.com";


  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@name"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{displayName}</span>
                  <span className="text-muted-foreground text-xs">{displayEmail}</span>
                </div>
                <EllipsisVertical className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={isMobile ? "bottom" : "right"}
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                <ReceiptText />
                <span>Billing</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <LogOut />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      ></SettingsDialog>
    </>
  );
};

export default NavUser;
