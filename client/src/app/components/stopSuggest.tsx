'use client'

import { useState } from 'react';
import { Location } from '@dto/location';
import { getLocations } from '../api/location';

export type StopSuggestProps = {
	canSearch: boolean;
	setSelectedLocationId: (id: string | null) => void;
	duration: number;
	setDuration: (val: number) => void;
	startTransitSearch: () => void;
}

export default function StopSuggest({ canSearch, setSelectedLocationId, duration, setDuration, startTransitSearch }: StopSuggestProps) {

	const [text, setText] = useState<string>('');
	const [locations, setLocations] = useState<Location[]>([]);

	async function fetchLocations(value: string) {
		if (value.length < 3) {
			clearSuggestions()
			return;
		}

		
		const locations = await getLocations(value);
		setLocations(locations);
		
	}

	function clearSuggestions() {
		setLocations([]);
	}

	function updateSearchText(val: string) {
		setText(val);
		setSelectedLocationId(null);

		void fetchLocations(val);
	}

	function selectLocation(loc: Location) {
		setSelectedLocationId(loc.id);
		setText(loc.name);
		setLocations([]);
	}

	return (
		<div className='w-full'>
			<div className="w-full flex flex-row">
				<input
					className="me-2 p-2 bg-white rounded-sm border-gray-300 focus:border-gray-500 border-2 basis-3/7"
					placeholder="Haltestelle suchen..."
					value={text}
					onChange={(el) => updateSearchText(el.target.value)} />
				<input 
					className="ms-2 me-2 p-2 bg-white rounded-sm border-gray-300 focus:border-gray-500 border-2 basis-3/7"
					value={duration}
					onChange={(el) => setDuration(+el.target.value)}
					type="number" />
				<button
					className="ms-2 p-2 bg-blue-500 disabled:bg-gray-500 rounded-sm border-gray-300 focus:border-gray-500 border-2 text-white basis-1/7"
					onClick={() => startTransitSearch()}
					disabled={!canSearch}>Suchen</button>
			</div>
			
			{
				!!locations.length &&
				<ul className="bg-white p-2 divide-gray-500 divide-2">
					{locations.map((loc) =>
						<li className="p-1 cursor-pointer" key={loc.id}><a onClick={() => selectLocation(loc)}>{loc.name}</a></li>
					)}
				</ul>
			}
		</div>
		);
} 