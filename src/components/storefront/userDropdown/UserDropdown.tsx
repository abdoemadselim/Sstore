// Libs
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar";
import { Button } from "@/components/base/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/base/dropdown-menu";

interface IProps {
    email: string;
    name: string;
    image: string
}

export default function UserDropdown({ email, name, image }: IProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full w-10 h-10 cursor-pointer">
                    <Avatar className="w-10 h-10">
                        <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
                        <AvatarImage src={image}></AvatarImage>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 px-0" align="end">
                <DropdownMenuLabel className="space-y-1 py-2 px-4">
                    <p className="font-medium text-sm">
                        {name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-none">{email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-0 py-0">
                    <Button variant="ghost" className="w-full flex justify-start px-4 py-2 ">
                        <LogoutLink>Log out</LogoutLink>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}