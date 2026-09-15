'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PrimeSSRProvider from "@/prime-ssr-provider";
import { usePathname } from 'next/navigation';
import {
    Home,
    Search,
    Sidebar as SidebarIcon,
    Cog,
    Check,
    ExclamationTriangle,
    InfoCircle,
    Times
} from '@primeicons/react';
import { useIsMobile } from '@primereact/hooks';
import { Avatar } from '@primereact/ui/avatar';
import { Button } from '@primereact/ui/button';
import { Sidebar } from '@primereact/ui/sidebar';
import Link from "next/link";
import { Toast } from '@primereact/ui/toast';
import { Toaster, toast } from '@primereact/ui/toaster';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  const isMobile = useIsMobile(1024);
  const pathname = usePathname();
  return (
    
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PrimeSSRProvider>
<Toaster.Root>
    <Toaster.Portal>
        <Toaster.Region>
            {({ toaster }) =>
                toaster?.toasts?.map((t) => (
                    <Toast.Root key={t.id} toast={t}>
                        <Toast.Content>
                            <Toast.Icon match="success">
                                <Check />
                            </Toast.Icon>
                            <Toast.Icon match="error">
                                <Times />
                            </Toast.Icon>
                            <Toast.Icon match="warn">
                                <ExclamationTriangle />
                            </Toast.Icon>
                            <Toast.Icon match="info">
                                <InfoCircle />
                            </Toast.Icon>
                            <Toast.Message>
                                <Toast.Title />
                                <Toast.Description />
                                <Toast.Action />
                            </Toast.Message>
                            <Toast.Close />
                        </Toast.Content>
                    </Toast.Root>
                ))
            }
        </Toaster.Region>
    </Toaster.Portal>
</Toaster.Root>



          <div className="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
                <Sidebar.Layout className="min-h-192! relative!" style={{height: "99.5vh"}}>
                    {isMobile && <Sidebar.Backdrop className="absolute!" />}
                    <Sidebar.Root id="preview" collapsible={isMobile ? 'offcanvas' : 'icon'} overlay={isMobile} defaultOpen={!isMobile}>
                        <Sidebar.Spacer />
                        <Sidebar.Aside>
                            <Sidebar.Panel>
                                <Sidebar.Header>
                                    <Sidebar.Menu>
                                        <Sidebar.MenuItem>
                                            <Sidebar.MenuButton className="p-1!">
                                                <img src="/pinetree.ico" alt="Jobhafen" className="size-5 shrink-0 object-contain"/>
                                                <span className="font-semibold text-sm">Jobhafen</span>
                                            </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                    </Sidebar.Menu>
                                </Sidebar.Header>

                                <Sidebar.Content>
                                  <Sidebar.Group key={"Menu"}>
                                            <Sidebar.GroupLabel>{"Menu"}</Sidebar.GroupLabel>
                                            <Sidebar.GroupContent>
                                                <Sidebar.Menu>
                                                    <Sidebar.MenuItem key={"Home"} as={Link} href={"/"}>
                                                        <Sidebar.MenuButton isActive={pathname === "/"}>
                                                            <Home />
                                                            <span>{"Home"}</span>
                                                        </Sidebar.MenuButton>
                                                    </Sidebar.MenuItem>
                                                    <Sidebar.MenuItem key={"Search"} as={Link} href={"/search"}>
                                                        <Sidebar.MenuButton isActive={pathname === "/search"}>
                                                            <Search />
                                                            <span>{"Search"}</span>
                                                        </Sidebar.MenuButton>
                                                    </Sidebar.MenuItem>
                                                    <Sidebar.MenuItem key={"Settings"} as={Link} href={"/setting"}>
                                                        <Sidebar.MenuButton isActive={pathname === "/setting"}>
                                                            <Cog />
                                                            <span>{"Settings"}</span>
                                                        </Sidebar.MenuButton>
                                                    </Sidebar.MenuItem>
                                                </Sidebar.Menu>
                                            </Sidebar.GroupContent>
                                        </Sidebar.Group>
                                </Sidebar.Content>

                                <Sidebar.Footer>
                                    <Sidebar.Menu>
                                        <Sidebar.MenuItem>
                                            <Sidebar.MenuButton className="p-1!">
                                                <Avatar.Root className="size-6! shrink-0! text-xs!" shape="circle">
                                                    <Avatar.Fallback>JD</Avatar.Fallback>
                                                </Avatar.Root>
                                                <span>Current User</span>
                                            </Sidebar.MenuButton>
                                        </Sidebar.MenuItem>
                                    </Sidebar.Menu>
                                </Sidebar.Footer>
                                <Sidebar.Rail />
                            </Sidebar.Panel>
                        </Sidebar.Aside>
                    </Sidebar.Root>

                    <Sidebar.Main>
                        <header className="flex h-12 items-center gap-2 border-b border-surface-200 dark:border-surface-700 px-4">
                            <Sidebar.Trigger as={Button} severity="secondary" variant="text" size="small" iconOnly>
                                <SidebarIcon />
                            </Sidebar.Trigger>
                        </header>
                        <div className="flex-1 p-4 flex flex-col gap-4">
                          {children}
                        </div>
                    </Sidebar.Main>
                </Sidebar.Layout>
            </div>
        </PrimeSSRProvider>
        </body>
    </html>
  );
}
