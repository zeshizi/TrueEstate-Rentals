import { Settings } from "lucide-react"

export function Header() {
  const navigationItems = [
    {
      name: "API Test",
      href: "/test-rapidapi-integration",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  return (
    <header>
      {/* Add your header content here */}
      <nav>
        <ul>
          {navigationItems.map((item) => (
            <li key={item.name}>
              <a href={item.href}>
                {item.icon}
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
