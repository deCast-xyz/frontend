import { db } from "@/util/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {

    const { wallet_address, stream_id } = req.body;

    const user = await db.creators.findFirst({
        where: {
            wallet_address: wallet_address
        }
    })

    if (user) {
        await db.creators.update({
            where: {
                creator_id: user.creator_id
            },
            data: {
                stream_id: stream_id
            }
        })
    }

    return res.status(200).json({ success: true })

}
