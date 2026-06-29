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
    Object.values(
        Wallet.summary.portfolios || {}
    );

    if(!portfolios.length){

        container.innerHTML = "";

        return;

    }

    container.innerHTML =

    portfolios.map(item => `

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

        </div>

    `).join("");

}

