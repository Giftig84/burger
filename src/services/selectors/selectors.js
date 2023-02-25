export const ingredientsSelector = (state) =>state.ingr.arrIngredient;
export const ingredientsModalSelector = (state) =>state.ingr.modalDetails;
export const noBunSelector = (state)  => state.constr.arrConstrIngr.filter(el => el.type !== "bun");
export const bunSelector = (state)  => state.constr.arrConstrIngr.find(el => el.type === "bun");
export const allOrderSelector = (state)  => state.constr.arrConstrIngr;
export const orderResponseSelector = (state)  => state.modalOrder.orderResponse;
export const isLoadingSelector = (state)  => state.api.isLoading;
export const currentTabSelector = (state)  => state.ingr.currentTab;