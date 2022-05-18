/* -----------------------------------------------------------------------
   * @ description : This is the Quotes service layer.
----------------------------------------------------------------------- */
import { getMarkupCost } from '../utilities/methods';
export const getQuoteService = async payload => {
  try {
    const { flag, no_of_color, quantity, price, zipcode, country } = payload;
    const markup_details = await getMarkupCost(flag, no_of_color, quantity, price);
    return { ...markup_details, zipcode, country };
  } catch (err) {
    throw new Error(err.message);
  }
};
