/* -----------------------------------------------------------------------
   * @ description : This is the user controller layer.
----------------------------------------------------------------------- */

import {
  register,
  login,
  logout,
  completeProfile,
  updateUserProfile,
  verifyEmailService,
  forgotPasswordService,
  resetPasswordService,
  resendEmailService,
  changePasswordService,
  getLiveFeedsFromInstagramService,
  allUsers,
  registerGuest
} from '../services/user';
import { failAction, successAction } from '../utilities/rest';
import Messages from '../utilities/messages';
import logger from '../utilities/logger';

export const signup = async (request, h) => {
  const { payload } = request;
  try {
    const data = await register(payload);
    return successAction(data, Messages.registerSuccess);
  } catch (error) {
    logger.error(error, '** Register User **');
    failAction(error.message);
  }
};

export const loginUser = async (request, h) => {
  const { payload } = request;
  try {
    const data = await login(payload);
    return successAction(data, Messages.loginSuccessfull);
  } catch (error) {
    logger.error(error, '** Login User **');
    failAction(error.message);
  }
};

export const loginAdmin = async (request, h) => {
  const { payload } = request;
  try {
    const data = await login(payload);
    return successAction(data, Messages.loginSuccessfull);
  } catch (error) {
    logger.error(error, '** Login User **');
    failAction(error.message);
  }
};

export const logoutUser = async (request, h) => {
  const {
    auth: {
      credentials: { user, token }
    }
  } = request;
  try {
    await logout({ user, token });
    return successAction(null, Messages.logoutSuccessfull);
  } catch (error) {
    logger.error(error, '** Logout User **');
    failAction(error.message);
  }
};

export const completeUserProfile = async (request, h) => {
  const { payload } = request;
  try {
    if (payload.role == 1 && !payload.merchantCategoryId) {
      throw new Error(Messages.merchantCategoryRequired);
    }
    let data = await completeProfile(payload);
    return successAction(data, Messages.registerSuccess);
  } catch (error) {
    logger.error(error, '** Profile Complete **');
    failAction(error.message);
  }
};

export const updateProfile = async (request, h) => {
  const {
    payload,
    auth: {
      credentials: { user }
    }
  } = request;
  try {
    let data = await updateUserProfile(payload, user);
    return successAction(data, Messages.profileUpdate);
  } catch (error) {
    logger.error(error, '** Update User Profile **');
    failAction(error.message);
  }
};

export const verifyEmail = async (request, h) => {
  const { payload } = request;
  try {
    const data = await verifyEmailService(payload);
    return successAction(data, Messages.emailVerified);
  } catch (error) {
    logger.error(error, '** Verify email of User **');
    failAction(error.message);
  }
};

export const forgotPassword = async (request, h) => {
  const { payload } = request;
  try {
    const data = await forgotPasswordService(payload);
    return successAction(data, Messages.forgetPassword);
  } catch (error) {
    logger.error(error, '** Forget Password of User **');
    failAction(error.message);
  }
};

// Use to reset password of the a particular user
export const resetPassword = async (request, h) => {
  const {
    payload,
    auth: {
      credentials: { user }
    }
  } = request;
  try {
    await resetPasswordService(payload, user);
    return successAction(null, Messages.resetpassword);
  } catch (error) {
    logger.error(error, '** Reset Password **');
    failAction(error.message);
  }
};

// API to resend verification email to user
export const resendEmail = async (request, h) => {
  const { payload } = request;
  try {
    await resendEmailService(payload);
    return successAction(null, Messages.resendEmail);
  } catch (error) {
    logger.error(error, '** Resend Email **');
    failAction(error.message);
  }
};

// Use to change password of user
export const changePassword = async (request, h) => {
  const {
    payload,
    auth: {
      credentials: { user }
    }
  } = request;
  try {
    await changePasswordService(payload, user);
    return successAction(null, Messages.passwordUpdated);
  } catch (error) {
    logger.error(error, '** Reset Password **');
    failAction(error.message);
  }
};

export const getLiveFeedsFromInstagram = async (request, h) => {
  try {
    const data = await getLiveFeedsFromInstagramService();
    return successAction(data, Messages.success);
  } catch (error) {
    logger.error(error, '** Get Live Feeds from Instagram **');
    failAction(error.message);
  }
};

export const allUser = async (request, h) => {
  try {
    const {
      payload,
      auth: {
        credentials: { user }
      }
    } = request;
    const data = await allUsers(payload);
    return successAction(data, Messages.passwordUpdated);
  } catch (error) {
    logger.error(error, '** Reset Password **');
    failAction(error.message);
  }
};

/* Signup as the guest */

export const signupGuest = async (request, h) => {
  const { payload } = request;
  try {
    const data = await registerGuest(payload);
    return successAction(data, Messages.registerSuccess);
  } catch (error) {
    logger.error(error, '** Register User **');
    failAction(error.message);
  }
};
