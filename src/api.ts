
const BASE_URL = `https://api.coinpaprika.com/v1`

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then(response => response.json());
}

export function fetchCoinInfo(coinID:string) {
    return fetch(`${BASE_URL}/coins/${coinID}`).then(response => response.json());
}

export function fetchCoinTickers(coinID:string) {
    return fetch(`${BASE_URL}/tickers/${coinID}`).then(response => response.json());
}

export function fetchCoinHistory(coinID:string) {
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinID}`).then(response => response.json());
}

