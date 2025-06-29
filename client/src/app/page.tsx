'use client'

import { useState } from "react";
import StopSuggest from "./components/stopSuggest";
import TableHandler from "./components/tableHandler";

export enum SEARCH_STATE {
	NOT_TRIGGERED,
	TRIGGERED,
	LOADING,
	FINISHED
}
export default function Main() {

	const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
	const [duration, setDuration] = useState<number>(60);
	const [searchState, setSearchState] = useState<SEARCH_STATE>(SEARCH_STATE.NOT_TRIGGERED);

	function startTransitSearch() {
		setSearchState(SEARCH_STATE.TRIGGERED);
	}

	return <div className="max-w-250 items-center justify-items-center sm:p-8 mx-auto font-sans">
		<StopSuggest 
			canSearch={!!selectedLocationId && searchState === SEARCH_STATE.NOT_TRIGGERED}
			setSelectedLocationId={setSelectedLocationId}
			duration={duration}
			setDuration={setDuration}
			startTransitSearch={startTransitSearch} />
		<TableHandler 
			locationId={selectedLocationId} 
			duration={duration} 
			searchState={searchState}
			setSearchState={setSearchState} />
	</div>;
}