import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { NextApiRequest, NextApiResponse } from "next";


async function minting({
    wallet_address,
    name,
    description,
    symbol,
    image
}: {
    wallet_address?: string,
    name: string,
    description: string,
    symbol: string,
    image: string
}) {
    const sdk = ThirdwebSDK.fromPrivateKey(
        process.env.PRIVATE_KEY!,
        "Mumbai"
    );

    const nftCollection = await sdk.getNFTCollection(
        "0x5fCB84F95E7ee10FE552B3803DF418b39FE2cA6E"
    );


    const metadata = {
        name,
        description: description,
        image: "https://i.imgur.com/PhG2XQT.png"
    };

    const walletAddress = wallet_address ?? "";

    const minted = await nftCollection.mintTo(walletAddress, metadata);

    return minted.receipt.transactionHash
}



export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, description, symbol, image, wallet_address } = req.body


    const hash = await minting({ wallet_address, name, description, symbol, image });

    console.log(hash)

    res.status(200).json({ message: "NFT Minted succesfully" })
}
