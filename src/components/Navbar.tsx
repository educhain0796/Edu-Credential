
import { Button } from "@/components/ui/button";
import { useOCID } from "@/context/OCIDContext";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import { Shield, LogOut, Moon, Sun, Upload, LayoutDashboard, Droplet, Compass, BookTextIcon, ShieldCheck, ShieldCheckIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { isAuthenticated, login, logout } = useOCID();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full h-16 bg-background border-b">
      <div className="educhain-container h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-educhain-blue" />
            <span className="text-xl font-semibold text-educhain-blue">EduChain Wallet</span>
          </Link>

          <div className="ml-8 hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/upload">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/dashboard">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/faucet">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <Droplet className="mr-2 h-4 w-4" />
                      Faucet
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/career">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <Compass className="mr-2 h-4 w-4" />
                      Career Wizard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>More</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      <li>
                        <Link to="/about">
                          <NavigationMenuLink className={cn(
                            "flex w-full select-none flex-col rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}>
                            <div className="flex items-center">
                              <BookTextIcon className="mr-2 h-4 w-4" />
                              <div className="text-sm font-medium leading-none">About</div>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                      <Link to="/support">
                          <NavigationMenuLink className={cn(
                            "flex w-full select-none flex-col rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}>
                            <div className="flex items-center">
                              <ShieldCheckIcon className="mr-2 h-4 w-4" />
                              <div className="text-sm font-medium leading-none">Support</div>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="default"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full opacity-60 hover:opacity-100 focus:opacity-80 transition-opacity"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={logout} className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </>
          ) : (
            <Button
              className="bg-educhain-accent hover:bg-educhain-blue text-white"
              onClick={login}
            >
              OCID Connect
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
