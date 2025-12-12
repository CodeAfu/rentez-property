import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/providers/auth-provider';
import { SettingsIcon, LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

interface ProfileProps {
  message?: string;
}

export default function Profile({ message = "User" }: ProfileProps) {
  const {
    logoutMutation: { mutate: logout },
  } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="size-10 mr-2 border-2 border-gray-300 bg-card rounded-full hover:cursor-pointer hover:scale-105 hover:bg-card hover:border-primary transition duration-200">
          <UserIcon className="w-12 h-12 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Welcome, <span className="text-primary font-semibold">{message}</span></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SettingsIcon className="w-4 h-4 mr-2" />
          <Link href="/user/settings">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="w-4 h-4 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
