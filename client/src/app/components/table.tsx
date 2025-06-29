import { Arrival, Departure } from "@dto/transit";

export enum TRANSIT_TYPE {
	DEPARTURE,
	ARRIVAL
}

export type TransitTableProps = {
	type: TRANSIT_TYPE;
	transitList: Departure[] | Arrival[];
}

export default function TransitTable({type, transitList}: TransitTableProps) {
	const MIN_IN_SECS = 60;
	if (!transitList.length) {
		return <p className="text-lg font-bold p-4 m-2">Keine {type === TRANSIT_TYPE.DEPARTURE ? 'Abfahrten' : 'Ankünfte'}</p>;
	}

	return <>
		<p className="text-lg font-bold p-4 mt-4">{type === TRANSIT_TYPE.DEPARTURE ? 'Abfahrt' : 'Ankünfte'}</p>
		<table className="border-collapse border border-gray-400 p-2 w-full">
			<thead>
				<tr className="p-1 bg-gray-200">
					<th className="border border-gray-400 p-1">Zeit</th>
					<th className="border border-gray-400 p-1">{type === TRANSIT_TYPE.DEPARTURE ? 'Nach' : 'Von'}</th>
					<th className="border border-gray-400 p-1">Zug</th>
					<th className="border border-gray-400 p-1">Gleis</th>
					<th className="border border-gray-400 p-1">Betrieber</th>
					<th className="border border-gray-400 p-1">Verspätung</th>
				</tr>
			</thead>
			<tbody>
			{
				transitList.map((tr) => <tr key={tr.tripId} className="p-1 bg-white">
					<td className="border border-gray-400 p-1">{tr.when ? new Date(tr.when).toLocaleString() : '--'}</td>
					<td className="border border-gray-400 p-1">{type === TRANSIT_TYPE.DEPARTURE ? (tr as Departure).direction : (tr as Arrival).provenance}</td>
					<td className="border border-gray-400 p-1">{tr.lineName ?? '__'}</td>
					<td className="border border-gray-400 p-1">{`${tr.platform ?? '--'}${tr.plannedPlatform !== tr.platform ? '(' + tr.plannedPlatform + ')' : ''}`}</td>
					<td className="border border-gray-400 p-1">{tr.operatorName ?? '--'}</td>
					{
						tr.delay 
							? <td className="border border-gray-400 p-1 text-red-600">{`${tr.delay / MIN_IN_SECS} min`}</td>
							: <td className="border border-gray-400 p-1 text-green-600">{'pünktlich'}</td>
					}
				</tr>)
			}
			</tbody>
		</table>
	</>;
}