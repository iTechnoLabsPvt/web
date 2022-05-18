/* -----------------------------------------------------------------------
   * @ description : This is the categories service layer.
----------------------------------------------------------------------- */
import { Categories, SubCategories } from '../mysqlDb';

export const getAllCategories = async payload => {
  try {
    const categories = await Categories.findAll(
      { include: [{ model: SubCategories, as: 'sub_categories' }] },
      { raw: true }
    );
    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
};
