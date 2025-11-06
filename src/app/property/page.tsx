"use client";
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const SearchClient = dynamic(() => import('./_components/search-client'), { ssr: false });

export default function TenantsPage() {
	const searchParams = useSearchParams();
	console.log('Current pathname:', searchParams.get('search'));
	
	return (
		<section className="min-h-screen p-2 max-w-7xl w-full m-auto">
				<SearchClient />
		</section>
	);
}

