/* -----------------------------------------------------------------------
   * @ description : This is the categories service layer.
----------------------------------------------------------------------- */
import { AnyoneHelp } from '../mysqlDb';

export const getAllHelp = async payload => {
  try {
    const help = await AnyoneHelp.findAll();
    return help;
  } catch (error) {
    throw new Error(error.message);
  }
};
