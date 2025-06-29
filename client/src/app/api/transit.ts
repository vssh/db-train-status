import { TransitList } from "@dto/transit";

export async function getTransitOptions(locationId: string, durationInMin: number): Promise<TransitList> {
	try {
		const response = await fetch(`http://localhost:3000/transit?stationId=${locationId}&duration=${durationInMin}`);
		if (response.ok) {
			return response.json() as Promise<TransitList>;
		} else {
			console.warn(`Could not fetch transit options, ${response.statusText}`);
		}
	} catch (e) {
		console.warn(`Could not fetch transit options, ${e}`);
	}

	return {departures: [], arrivals: []};
}