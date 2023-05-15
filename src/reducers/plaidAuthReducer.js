import { createSlice } from "@reduxjs/toolkit";


const plaidAuthentification = createSlice({
    name: "plaid",
    initialState: { loading: false, plaidInfo: {
        initiationType: "",
        transferAmount: "",
        linkSuccess: false,
        isItemAccess: true,
        isPaymentInitiation: false,
        linkToken: "", // Don't set to null or error message will show up briefly when site loads
        isError: false,
        backend: true,
        products: ["transactions"],
        request_id: "",
        linkTokenError: {
            error_type: "",
            error_code: "",
            error_message: "",
     },
    } },
    reducers: {
        plaidAuthRequest(state, action){
            return {...state, loading: true };
        },
        plaidAuthGetInfoSuccessful(state, action){
            return {  ...state, plaidInfo: { ...state.plaidInfo, ...action.payload.plaidInfo }, loading: false };
        },
        plaidAuthCreatePymtIntentSuccessful(state, action){
            return {  ...state, plaidInfo: { ...state.plaidInfo, ...action.payload.plaidInfo }, loading: false };
        },
        plaidAuthRequestTokenSuccessful(state, action){
            return {  ...state, plaidInfo: { ...state.plaidInfo, ...action.payload.plaidInfo }, loading: false };
        },
        plaidAuthExchangeTokenSuccessful(state, action){
            return {  ...state, plaidInfo: { ...state.plaidInfo, ...action.payload.plaidInfo }, loading: false };
        },
        plaidUpdatePymtIntentSuccessful(state, action){
            return {  ...state, plaidInfo: { ...state.plaidInfo, ...action.payload.plaidInfo }, loading: false };
        },
        plaidSetTransferAmount(state, action){
            return { ...state, plaidInfo: { ...state.plaidInfo, ...action.payload.plaidInfo }, loading: false };
        },
        plaidUGetTransferStatusSuccessful(state, action){
            return {  ...state, plaidInfo: { ...state.plaidInfo, ...action.payload.plaidInfo }, loading: false };
        },
        plaidGetLinkedAccountInfoSuccess(state, action){
            return { ...state, loading: false, linkedAcct: action.payload };
        },
        plaidGetLinkedAccountFailed(state, action){
            return { ...state, loading: false, error: action.payload };
        },
        plaidSetAmountFailure(state, action){
            return { ...state, loading: false, amount: "", error: action.payload };
        },
        plaidAuthFailure(state, action){
            return { ...state, plaidInfo: { ...state.plaidInfo, ...action.payload.plaidInfo }, error: action.payload.error, loading: false };
        },
        userLogoutPlaid(state, action){
            return { loading: false, plaidInfo: {} };
        },
    },
});

export const {
    plaidAuthRequest,
    plaidAuthFailure,
    plaidAuthExchangeTokenSuccessful,
    plaidAuthRequestTokenSuccessful,
    plaidAuthCreatePymtIntentSuccessful,
    plaidAuthGetInfoSuccessful,
    plaidUpdatePymtIntentSuccessful,
    plaidSetTransferAmount,
    plaidUGetTransferStatusSuccessful,
    plaidGetLinkedAccountFailed,
    plaidGetLinkedAccountInfoSuccess,
    userLogoutPlaid,
    plaidSetAmountFailure,
} = plaidAuthentification.actions;

export default plaidAuthentification.reducer;