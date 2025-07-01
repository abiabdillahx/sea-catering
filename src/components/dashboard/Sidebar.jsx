
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Menu, 
  X, 
  User, 
  CreditCard, 
  Settings, 
  BarChart3, 
  Users, 
  Calendar,
  LogOut,
  ChefHat
} from 'lucide-react';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState('user'); // Mock role - replace with actual auth

  // Mock user data - replace with actual auth data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null
  };

  const userNavigation = [
    { name: 'Profile', href: '/dashboard/user', icon: User },
    { name: 'My Subscription', href: '/dashboard/user/subscription', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/user/settings', icon: Settings },
  ];

  const adminNavigation = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: BarChart3 },
    { name: 'Users', href: '/dashboard/admin/users', icon: Users },
    { name: 'Subscriptions', href: '/dashboard/admin/subscriptions', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ];

  const navigation = userRole === 'admin' ? adminNavigation : userNavigation;

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-card border-r">
            <SidebarContent 
              navigation={navigation} 
              user={user} 
              userRole={userRole}
              onLogout={handleLogout}
              onClose={() => setSidebarOpen(false)}
              pathname={pathname}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r px-6 py-4">
          <SidebarContent 
            navigation={navigation} 
            user={user} 
            userRole={userRole}
            onLogout={handleLogout}
            pathname={pathname}
          />
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-background px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex-1 text-sm font-semibold leading-6 text-foreground">
          SEA Catering
        </div>
      </div>
    </>
  );
}

function SidebarContent({ navigation, user, userRole, onLogout, onClose, pathname }) {
  return (
    <>
      {/* Header with logo */}
      <div className="flex h-16 shrink-0 items-center justify-between">
        <div className="flex items-center gap-3">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">SEA Catering</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* User profile section */}
      <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          <p className="text-xs text-primary font-medium capitalize">{userRole}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`
                  group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-colors
                  ${pathname === item.href 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                onClick={onClose}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer with logout */}
      <div className="mt-auto pt-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-x-3 text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </>
  );
}