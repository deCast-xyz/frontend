import { Button, Table } from '@mantine/core';
import Link from 'next/link';

const Dahboard = () => {
	return (
		<div className="min-h-screen bg-white p-5 rounded-lg">
			<h5 className="text-xl  my-5 text-gray-900 font-medium">Dashboard</h5>

			<div className="flex justify-between items-center bg-gray-100 py-3 px-3 rounded-lg">
				<b className="text-gray-900 ">Start Live Streaming</b>

				<Link href="/modules" passHref>
					<Button radius={'lg'}>Go Live</Button>
				</Link>
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
