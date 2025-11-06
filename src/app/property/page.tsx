"use client";

import dynamic from 'next/dynamic';

const SearchClient = dynamic(() => import('./_components/search-client'), { ssr: false });

export default function TenantsPage() {
	return (
		<section className="min-h-screen p-2 max-w-7xl w-full m-auto">
			<SearchClient />
		</section>
	);
}

