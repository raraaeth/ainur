/* =========================
   WALLET API
========================= */

const WALLET_SHEET = "wallet";

const WALLET_API_URL =
`https://opensheet.elk.sh/${CONFIG.SHEET_ID}/${WALLET_SHEET}`;

/* =========================
   FETCH WALLET LIST
========================= */

async function fetchWalletList(){

    try{

        const response =
        await fetch(WALLET_API_URL);

        Wallet.raw =
        await response.json();

        Wallet.summary.totalWallets =
        Wallet.raw.filter(
            item =>
            item.Aktif === "TRUE"
        ).length;

        console.log(
            "Wallet Loaded :",
            Wallet.summary.totalWallets
        );

        return Wallet.raw;

    }catch(error){

        console.error(
            "Wallet Error :",
            error
        );

        Wallet.raw=[];

    }

}

/* =========================
   FETCH WALLET TOKEN
========================= */

async function fetchWalletTokens(
    address,
    network
){

    try{

        let chains = [];

if(network === "evm"){

    chains = EVM_CHAINS;

}else{

    return [];

}

        let allTokens = [];

for(const chain of chains){

    const response =
    await fetch(

`${MORALIS.BASE_URL}/wallets/${address}/tokens?chain=${chain}`,

    {

        headers:{

            "accept":"application/json",

            "X-API-Key":
            MORALIS.API_KEY

        }

    });

    const data =
    await response.json();

    if(data.result){

        allTokens.push(
            ...data.result
        );

    }

}

return allTokens;

    }catch(error){

        console.error(

            "Moralis Error:",

            address,

            error

        );

        return [];

    }

}

/* =========================
   FETCH ALL WALLET
========================= */

async function fetchAllWalletTokens(){

    const activeWallets =

    Wallet.raw.filter(

        item =>

        item.Aktif === "TRUE"

    );

    Wallet.tokens =

    await Promise.all(

        activeWallets.map(

            async wallet=>{

                let tokens=[];

                if(

                    wallet.Network==="sol"

                ){

                    tokens =

                    await fetchSolanaWallet(

                        wallet.Address

                    );

                }else{

                    tokens =

                    filterWalletTokens(

                        await fetchWalletTokens(

                            wallet.Address,

                            wallet.Network

                        )

                    );

                }

                return{

                    portfolio:

                    wallet.Portofolio,

                    network:

                    wallet.Network,

                    provider:

                    wallet.Provider,

                    address:

                    wallet.Address,

                    tokens

                };

            }

        )

    );

    console.log(

        "Portfolio Loaded:",

        Wallet.tokens

    );

    saveWalletCache();

    return Wallet.tokens;

}
