export async function generateMetadata() {
	return { title: 'More fit - Auth'}
}

export default function AuthLayout({children}:{children: React.ReactNode}) {
	return <>{children}</>
}