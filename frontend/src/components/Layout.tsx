import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Separator } from "./ui/separator"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="fixed top-0 flex items-center gap-2 p-4">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          Frosty
        </header>
        
        <main className="flex-1">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}