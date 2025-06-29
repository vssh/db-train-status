
import { Location } from '@dto/location';

export async function getLocations(value: string): Promise<Location[]> {
	try {
				const response = await fetch(`http://localhost:3000/locations?name=${value}`);
				if (response.ok) {
					return response.json() as Promise<Location[]>;
				} else {
					console.warn(`Could not fetch locations, ${response.statusText}`);
				}
			} catch (e) {
				console.warn(`Could not fetch locations, ${e}`);
			}
	return [];
}