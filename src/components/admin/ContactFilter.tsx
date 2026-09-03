import Link from 'next/link';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { IoFilter } from 'react-icons/io5';

const Filter_BY = ['New', 'Replied', 'None'];

export const ContactFilter = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span>
            <IoFilter />
          </span>
          <span>Filter By</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Filter_BY.map((f) => (
          <DropdownMenuItem asChild key={f}>
            <Link
              href={{
                pathname: '/admin/contacts',
                query: {
                  filter: f,
                },
              }}
            >
              {f}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
