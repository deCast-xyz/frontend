import { Button, Table } from '@mantine/core';

const Dahboard = () => {
	return (
		<div className="min-h-screen bg-white p-5 rounded-lg">
			<h5 className="text-xl  my-5 text-gray-900 font-medium">Dashboard</h5>

			<div className="flex justify-between items-center">
				<b className="text-gray-900 ">Start Live Streaming</b>

				<Button>Go Live</Button>
			</div>

			<h4>Subscriptions</h4>

			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Network</th>
						<th>Owners</th>
						<th>Launch Date</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tbody></tbody>
				</tbody>
			</Table>
		</div>
	);
};

export default Dahboard;
