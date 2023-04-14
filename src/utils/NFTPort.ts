type ChainType = string;
type NameType = string;
type SymbolType = string;
type OwnerAddressType = string;
type MetadataUpdatableType = boolean;

const PRIVATE_API_KEY: string = process.env.NFTPORT_API!;

interface ContractData {
    chain: ChainType;
    name: NameType;
    symbol: SymbolType;
    owner_address: OwnerAddressType;
    metadata_updatable: MetadataUpdatableType;
}


const deployNFTContract = ({
    chain,
    name,
    symbol,
    owner_address,
    metadata_updatable
}: ContractData) => {
    fetch('https://api.nftport.xyz/v0/contracts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: PRIVATE_API_KEY!,
        },
        body: JSON.stringify({
            chain,
            name,
            symbol,
            owner_address,
            metadata_updatable,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
        });
}

const deployNFTMetadata = ({
    chain,
    name,
    symbol,
    owner_address,
    metadata_updatable
}: ContractData) => {
    fetch('https://api.nftport.xyz/v0/contracts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: PRIVATE_API_KEY!,
        },
        body: JSON.stringify({
            chain,
            name,
            symbol,
            owner_address,
            metadata_updatable,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
        });
}

const mintNFT = ({
    chain,
    name,
    symbol,
    owner_address,
    metadata_updatable
}: ContractData) => {
    fetch('https://api.nftport.xyz/v0/contracts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: PRIVATE_API_KEY,
        },
        body: JSON.stringify({
            chain,
            name,
            symbol,
            owner_address,
            metadata_updatable,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
        });
}


export {
    mintNFT,
    deployNFTMetadata,
    deployNFTContract
};
