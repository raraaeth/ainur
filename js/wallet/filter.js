/* =========================
   FILTER TOKEN
========================= */

function filterWalletTokens(tokens){

    return tokens.filter(token=>{

        const symbol =

        (token.symbol || "")
        .toUpperCase();

        return CORE_ASSET.includes(
            symbol
        );

    });

}
