/* =========================
   FILTER TOKEN
========================= */

function filterWalletTokens(tokens){

    return tokens.filter(token =>{

        /* Hide Spam */

        if(
            WALLET_FILTER.hideSpam &&
            token.possible_spam
        ){
            return false;
        }

        /* Hide USD = 0 */

        if(
            WALLET_FILTER.hideZeroUsd &&
            Number(token.usd_value) <= 0
        ){
            return false;
        }

        /* Minimum USD */

        if(
            Number(token.usd_value) <
            WALLET_FILTER.minimumUsd
        ){
            return false;
        }

        return true;

    });

}
