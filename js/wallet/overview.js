/* =====================================================
   WALLET OVERVIEW
===================================================== */

function renderWalletOverview(){

    const container =
    document.getElementById(
        "walletOverview"
    );

    if(!container) return;

    const portfolios =
Object.entries(
    Wallet.summary.portfolios || {}
).map(([name,data]) => ({

    name,

    ...data

}));

    if(!portfolios.length){

        container.innerHTML = "";

        return;

    }
/*-------container inner html*/
    container.innerHTML =

portfolios.map(item=>{

const evm =

item.evm

.map(token=>`

<div class="wallet-token">

    <span>${token.symbol}</span>

    <span>$${token.usd_value.toFixed(2)}</span>

</div>

`)

.join("");

const sol =

item.sol

.map(token=>`

<div class="wallet-token">

    <span>${token.symbol}</span>

    <span>$${token.usd_value.toFixed(2)}</span>

</div>

`)

.join("");

return `

<div class="wallet-card">

    <div class="wallet-card-top">

        <div>

            <div class="wallet-name">

                ${item.name}

            </div>

            <div class="wallet-provider">

                Multi Chain Wallet

            </div>

        </div>

    </div>

    <div class="wallet-total">

        $${item.totalUSD.toFixed(2)}

    </div>

    <div class="wallet-idr">

        ≈ ${formatCurrency(
            item.totalUSD * USD_IDR
        )}

    </div>

    <div class="wallet-detail">

        ${
        evm
        ?

        `

        <div class="wallet-network">

            EVM

        </div>

        ${evm}

        `

        :

        ""
        }

        ${
        sol
        ?

        `

        <div class="wallet-network">

            SOLANA

        </div>

        ${sol}

        `

        :

        ""
        }

    </div>

</div>

`;

}).join("");

}

