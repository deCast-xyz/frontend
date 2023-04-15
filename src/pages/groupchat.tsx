import type { NextPage } from "next";
import { useEffect } from "react";
import { useSigner, useAccount } from "wagmi";


import * as PushAPI from "@pushprotocol/restapi";

const groupchat = () => { 
   
    const {address} = useAccount();
    const signer = useSigner();

    useEffect(() => {

        async function startChat() {
            
    
     if(signer){


        const user1 = await PushAPI.user.create({
            //@ts-ignore
            signer: signer
        });
    
      const user = await PushAPI.user.get({
        account: `eip155:80001:${address}`
      });
      
      
      const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
        encryptedPGPPrivateKey: user.encryptedPrivateKey, 
        signer: signer as any,
      });
      
      // actual api
      const response = await PushAPI.chat.createGroup({
        groupName: "Push Group Chat 3",
        groupDescription: 'This is the oficial group for Push Protocol',
        members: ['0x9e60c47edF21fa5e5Af33347680B3971F2FfD464','0x3829E53A15856d1846e1b52d3Bdf5839705c29e5'],
        groupImage:" &lt;group image link&gt;" ,
        admins: ['0x3829E53A15856d1846e1b52d3Bdf5839705c29e5'],
        isPublic: true,
        account: '0xD993eb61B8843439A23741C0A3b5138763aE11a4',
        pgpPrivateKey: pgpDecryptedPvtKey, //decrypted private key
      });  
      console.log(response);
     }
      }
    
      startChat();
      },[]);
    
}

export default groupchat;