import { Departure, Arrival } from '@dto/transit'
import { useEffect, useState } from 'react';
import TransitTable, { TRANSIT_TYPE } from './table';
import { getTransitOptions } from '../api/transit';
import { SEARCH_STATE } from '../page';
export type TableHandlerProps = {
	locationId: string | null;
	duration: number;
	searchState: SEARCH_STATE;
	setSearchState: (val: SEARCH_STATE) => void;
}

export default function TableHandler({ locationId, duration, searchState, setSearchState }: TableHandlerProps) {
	const [departures, setDepartures] = useState<Departure[]>([]);
	const [arrivals, setArrivals] = useState<Arrival[]>([]);

	async function fetchTransitOptions(locationId: string, duration: number) {
		const transit = await getTransitOptions(locationId, duration);
		setDepartures(transit.departures);
		setArrivals(transit.arrivals);

		setSearchState(SEARCH_STATE.FINISHED);
	}

	useEffect(() => {
		if (searchState === SEARCH_STATE.TRIGGERED) {
			if (locationId) {
				setSearchState(SEARCH_STATE.LOADING);
				void fetchTransitOptions(locationId, duration);
			}
		}
	}, [searchState])

	useEffect(() => {
		setDepartures([]);
		setArrivals([]);
		setSearchState(SEARCH_STATE.NOT_TRIGGERED);
	}, [locationId, duration])

	if (!locationId || searchState !== SEARCH_STATE.FINISHED) {
		return null;
	}
	return <>
		<TransitTable
			type={TRANSIT_TYPE.DEPARTURE}
			transitList={departures}
		/>
		<TransitTable 
			type={TRANSIT_TYPE.ARRIVAL}
			transitList={arrivals}
		/>
	</>;
}