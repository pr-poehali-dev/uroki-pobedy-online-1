import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { title: "Главная", href: "/" },
    { title: "О проекте", href: "/about" },
    { 
      title: "Исторические материалы",
      children: [
        { title: "Великая Отечественная война", href: "/materials/vov" },
        { title: "Специальная военная операция", href: "/materials/svo" },
        { title: "Донбасс", href: "/materials/donbass" },
        { title: "Крым", href: "/materials/crimea" },
        { title: "Россия", href: "/materials/russia" },
      ]
    },
    { 
      title: "Герои",
      children: [
        { title: "Герои ВОВ", href: "/heroes/vov" },
        { title: "Герои СВО", href: "/heroes/svo" },
      ]
    },
    { title: "Интерактивные уроки", href: "/interactive" },
  ];

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={child.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">{child.title}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link to={item.href}>
                      <NavigationMenuLink className="px-3 py-2 text-foreground hover:text-primary transition-colors">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button asChild variant="default" className="bg-victory-red hover:bg-victory-red/90 text-white">
            <Link to="/login">Личный кабинет</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <div className="space-y-2">
                    <div className="font-medium">{item.title}</div>
                    <div className="pl-4 border-l-2 border-muted space-y-2">
                      {item.children.map((child) => (
                        <Link 
                          key={child.title} 
                          to={child.href} 
                          className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={item.href} 
                    className="px-3 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
            <Button asChild variant="default" className="mt-2 w-full bg-victory-red hover:bg-victory-red/90 text-white">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Личный кабинет</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
