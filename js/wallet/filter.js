/* =========================
   FILTER TOKEN
========================= */

function filterWalletTokens(tokens){

    return tokens.filter(token=>{

        const symbol =

        (token.symbol || "")
        .toUpperCase();

        const usd =

        Number(
            token.usd_value || 0
        );

        return (

            CORE_ASSET.includes(
                symbol
            )

            &&

            usd > 0

        );

    });

}
