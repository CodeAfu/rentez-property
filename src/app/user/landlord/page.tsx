"use client";

import { useState } from 'react';

export default function HomeownerPage() {
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmitting(true);
		setMessage(null);
		const form = e.currentTarget;
		const formData = new FormData(form);
		try {
			const res = await fetch('/api/properties', { method: 'POST', body: formData });
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err?.error ? JSON.stringify(err.error) : res.statusText);
			}
			form.reset();
			setMessage('Property listed successfully');
			} catch (err) {
			if (err instanceof Error) {
				setMessage(`Failed to submit: ${err.message}`);
			} else {
				setMessage(`Failed to submit: ${String(err)}`);
			}
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<section>
			<h1>List a Property</h1>
			<p>Provide details below. You can upload images or paste image URLs.</p>
			<form onSubmit={onSubmit} style={{ display: 'grid', gap: 14, maxWidth: 720 }}>
				<div>
					<label htmlFor="title">Title</label>
					<input id="title" name="title" type="text" required placeholder="Sunny 2BR Apartment" />
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea id="description" name="description" required rows={4} placeholder="Describe the property, amenities, terms..." />
				</div>
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
					<div>
						<label htmlFor="pricePerMonth">Price per month (USD)</label>
						<input id="pricePerMonth" name="pricePerMonth" type="number" min="1" required placeholder="1800" />
					</div>
					<div>
						<label htmlFor="state">State</label>
						<input id="state" name="state" type="text" required placeholder="CA" />
					</div>
				</div>
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
					<div>
						<label htmlFor="city">City</label>
						<input id="city" name="city" type="text" required placeholder="San Jose" />
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<input id="address" name="address" type="text" required placeholder="123 Main St" />
					</div>
				</div>
				<div>
					<label htmlFor="images">Upload images</label>
					<input id="images" name="images" type="file" multiple accept="image/*" />
					<p style={{ fontSize: 12, color: '#666', margin: '6px 0 0' }}>Optional. You can upload multiple files.</p>
				</div>
				<div>
					<label htmlFor="imageUrls">Or image URLs (comma-separated)</label>
					<input id="imageUrls" name="imageUrls" type="text" placeholder="https://..., https://..." />
				</div>
				<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
					<button disabled={submitting} type="submit">{submitting ? 'Submitting...' : 'Publish Listing'}</button>
					{message && <span style={{ color: message.startsWith('Failed') ? '#b00020' : '#067d00' }}>{message}</span>}
				</div>
			</form>
		</section>
	);
}

