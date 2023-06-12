import { createSlice } from "@reduxjs/toolkit";


const plaidAuthentification = createSlice({
    name: "plaid",
    initialState: { loading: false, plaidInfo: {
        initiationType: "",
        transferAmount: "",
        description: "",
        type: "",
        linkSuccess: false,
        transferAuthSuccess: false,
        isItemAccess: true,
        isPaymentInitiation: false,
        linkToken: "", // Don't set to null or error message will show up briefly when site loads
        isError: false,
        backend: true,
        products: ["transactions"],
        request_id: "",
        transferStatus: "",
        linkTokenError: {
            error_type: "",
            error_code: "",
            error_message: "",
     },
    } },
    reducers: {
        plaidAuthRequest(state, action){
            return {...state, loading: true, ...action.payload };
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
        plaidGetTransferStatusSuccessful(state, action){
            return {  ...state, plaidInfo: { ...state.plaidInfo, ...action.payload.plaidInfo }, loading: false };
        },
        plaidCreateTransferSuccessful(state, action){
            return {  ...state, plaidInfo: { ...state.plaidInfo, ...action.payload.plaidInfo }, loading: false };
        },
        plaidGetLinkedAccountInfoSuccess(state, action){
            return { ...state, loading: false, linkedAcct: action.payload };
        },
        plaidUnLinkAccountSuccess(state, action){
            return { ...state, loading: false, unlinkResponse: action.payload, fetchingData: false };
        },
        plaidSimulateTransferEventSuccess(state, action){
            return { ...state, loading: false, ...action.payload };
        },
        plaidSimulateTransferEventFailed(state, action){
            return { ...state, loading: false, ...action.payload };
        },
        plaidGetLinkedAccountFailed(state, action){
            return { ...state, loading: false, error: action.payload, fetchingData: false };
        },
        plaidUnLinkAccountFailed(state, action){
            return { ...state, loading: false, error: action.payload };
        },
        plaidCreateTransferFailed(state, action){
            return { ...state, loading: false, error: action.payload };
        },
        plaidSetAmountFailure(state, action){
            return { ...state, loading: false, amount: "", error: action.payload };
        },
        plaidAuthFailure(state, action){
            return { ...state, plaidInfo: { ...state.plaidInfo, ...action.payload.plaidInfo }, error: action.payload.error, loading: false };
        },
        userLogoutPlaid(state, action){
            return { loading: false, plaidInfo: { initiationType: "",
            transferAmount: "",
            description: "",
            type: "",
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
         }, } };
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
    plaidGetTransferStatusSuccessful,
    plaidCreateTransferSuccessful,
    plaidUnLinkAccountSuccess,
    plaidGetLinkedAccountFailed,
    plaidGetLinkedAccountInfoSuccess,
    plaidSimulateTransferEventSuccess,
    plaidSimulateTransferEventFailed,
    userLogoutPlaid,
    plaidUnLinkAccountFailed,
    plaidSetAmountFailure,
    plaidCreateTransferFailed,
} = plaidAuthentification.actions;

export default plaidAuthentification.reducer;