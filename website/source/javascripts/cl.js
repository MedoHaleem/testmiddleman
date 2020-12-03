import { initCLayer, Sku, ShippingCategory } from '@commercelayer/js-sdk';
import { getIntegrationToken } from '@commercelayer/js-auth';
let token;
let initialized = false;
const endpoint = process.env.ENDPOINT
const config = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECERET,
    endpoint: endpoint
}
const getToken = async () => {
    token = await getIntegrationToken(config);
    console.log('My  token: ', token);
    console.log('Expiration date: ', token.expires);
    const { accessToken } = token;

    if (!initialized) {
        initCLayer({ accessToken, endpoint });
        initialized = true;
    }
}

export const getPriceAndStock = async (code) => {
    await getToken()
    const sku = await Sku.includes('stockItems').includes('prices').findBy({ code: code })
    const prices = sku.prices().toArray()
    const stock = sku.stockItems().toArray()
    return {price: prices[0].amountFloat, stock: stock[0].quantity}
}


