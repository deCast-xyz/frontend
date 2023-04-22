import { db } from "@/util/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {

    const { wallet_address, stream_id, playback_id } = req.body;


    await db.creators.updateMany({
        where: {
            wallet_address: wallet_address.toLocaleLowerCase()
        },
        data: {
            stream_id: stream_id,
            playback_id: playback_id,
        }
    })

    return res.status(200).json({ success: true })

}
