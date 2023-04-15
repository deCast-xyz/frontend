import { Badge, Button, Table } from '@mantine/core';
import Link from 'next/link';

const Dahboard = () => {
	return (
		<div className="min-h-screen  p-5 rounded-lg">
			<img src="/image.png" className="w-3/4" />

			<div className="flex justify-between items-center  bg-[#13161B] rounded-lg px-2 py-5 m-3">
				<b className="text-gray-100 ">Start Live Streaming</b>

				<Link href="/modules" passHref>
					<Button radius={'lg'}>Go Live</Button>
				</Link>
			</div>

			<div className="mt-10 bg-[#13161B] rounded-lg px-2 py-5 m-3">
				<h4 className="mb-10 font-medium">Subscriptions</h4>

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
						<tr>
							<td>John’s Membership</td>
							<td>10 USDC</td>
							<td>Polygon</td>
							<td>1,500</td>
							<td>Dec 1, 2022</td>
							<td>
								<Badge radius={'lg'}>Active</Badge>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default Dahboard;
