import Link from "next/link";

export interface NavbarLink {
	title: string;
	url: string;
}


export interface NavbarProps {
	auth:boolean;
}

export const NAVBAR_LINKS:NavbarLink[] =  [
	{title: 'dashboard', url: '/dashboard'},
	{title: 'sport', url: '/sport'},
	{title: 'food', url: '/food'},
]

export default function Navbar (props:NavbarProps) {
	return <nav data-testid='navbar' className="flex justify-between fixed w-full border-b border-neutral-400 p-4 text-sm">
		<Link href='/'>Logo</Link>
		<ul className="flex gap-4">
			{NAVBAR_LINKS.map((link, i) => <li key={`link[${i}]`} className="capitalize">
				<Link href={link.url}>{link.title}</Link>
			</li>)}
		</ul>
		{props.auth && <div>User</div>}
		{!props.auth && <Link href='/sign-in'>Sign In</Link>}
	</nav>
}