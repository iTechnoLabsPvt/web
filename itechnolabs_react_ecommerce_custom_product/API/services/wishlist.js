/* -----------------------------------------------------------------------
   * @ description : This is the wishlist service layer.
----------------------------------------------------------------------- */
import { Wishlist, Products } from '../mysqlDb';

export const addWishlistService = async (payload, user) => {
  try {
    payload = { ...payload, user_id: user.id };
    const wishlist = await Wishlist.register(payload);
    return wishlist;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const removeWishlistService = async payload => {
  try {
    return await Wishlist.destroy({ where: { id: payload._id } });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getWishlistService = async user => {
  try {
    let wishlist = await Wishlist.findAll({ where: { user_id: user.id } });
    wishlist = JSON.parse(JSON.stringify(wishlist));
    wishlist = await Promise.all(
      wishlist.map(async obj => {
        obj.product_data = await Products.findOne({ where: { id: obj.product_id }, raw: true });
        return obj;
      })
    );
    return wishlist;
  } catch (err) {
    throw new Error(err.message);
  }
};
