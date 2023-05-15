import {TRootState} from "../../Types/types";

export const ingredientsSelector = (state: TRootState) =>state.ingr.arrIngredient;
export const ingredientsModalSelector = (state: TRootState) =>state.modal.modalDetails;
export const noBunSelector = (state: TRootState)  => state.constr.arrConstrIngr.filter((el) => el.type !== "bun");
export const bunSelector = (state: TRootState)  => state.constr.arrConstrIngr.find((el) => el.type === "bun");
export const allOrderSelector = (state: TRootState)  => state.constr.arrConstrIngr;
export const orderResponseSelector = (state: TRootState)  => state.modalOrder.orderResponse;
export const isLoadingSelector = (state: TRootState)  => (state.ingr.isLoading || state.modalOrder.isLoading || state.modalFeedOrder.isLoading);
export const currentTabSelector = (state: TRootState)  => state.ingr.currentTab;
export const authSelector = (state: TRootState)  => state.user.isAuth;
export const rstPswSelector = (state : TRootState)  => state.user.isResetPsw;
export const userSelector = (state: TRootState)  => state.user.user;
export const allFeedSelector = (state: TRootState)  => state.feedAll.feed;
export const profileFeedSelector = (state: TRootState)  => state.feedProfile.feedProfile;
export const singleFeedOrderSelector = (state: TRootState)  => state.modalFeedOrder.modalDetails;
export const isLoadingOrderNumberSelector = (state: TRootState)  => state.modalOrder.isLoading;