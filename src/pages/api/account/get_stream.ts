import { db } from "@/util/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {

    const { wallet_address } = req.body;

    const user = await db.creators.findFirst({
        where: {
            wallet_address: wallet_address
        }
    })

    console.log(user)

    if (user) {
        return res.status(200).json({
            stream_id: user.stream_id,
            playback_id: user.playback_id
        })
    }

    return res.status(404).json({ error: true })

}
