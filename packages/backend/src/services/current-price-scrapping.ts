import axios from "axios";
import { load } from "cheerio";

export const getCurrentPriceOfStockFromInvertirOnline = async (
  ticker: string = "AMZN",
  currency: string = 'ARS',
  url: string = "https://iol.invertironline.com/titulo/cotizacion/BCBA/",
) => {
  try {
    let price
    
    
    if(currency === '$USD') ticker = ticker+'D';

    const { data } = await axios.get(`${url}${ticker}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const content = load(data);

    content('[data-field="UltimoPrecio"]').each((index, element) => {
      price = content(element).text().trim().replace('.','');
    });
    console.log('url attempted:', `${url}${ticker}`)
    
    return parseInt(price);

  } catch (error) {
    return null;
  }
};
