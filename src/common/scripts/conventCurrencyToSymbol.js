export default function convertCurrencyToSymbol(currency) {
    if(currency.toUpperCase() === 'EUR') {
        return '€';
    } else {
        return '£';
    }
}