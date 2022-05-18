/* -----------------------------------------------------------------------
   * @ description : This is the faq service layer.
----------------------------------------------------------------------- */
import { Faq } from '../mysqlDb';

export const addFaqService = async payload => {
  try {
    const faq_details = await Faq.register(payload);
    return faq_details;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateFaqService = async payload => {
  try {
    const { id, ...data } = payload;
    const faq_details = await Faq.update(data, {
      where: { id: id }
    });
    return faq_details;
  } catch (err) {
    throw new Error(err.message);
  }
};
