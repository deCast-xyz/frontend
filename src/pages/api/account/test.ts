import { db } from "@/util/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {

    const creators = await db.creators.findMany({});

    for (const creator of creators) {
        await db.creators.update({
            where: {
                creator_id: creator.creator_id
            },
            data: {
                wallet_address: creator.wallet_address?.toLocaleLowerCase()
            }
        })
    }

    return res.status(200).json({ success: true })

}
