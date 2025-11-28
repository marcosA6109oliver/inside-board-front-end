import { fetchAPI } from "./fetchAPI";
import { ApiResponse } from "../types/index";

export const login = async (
    email: string,
    password: string
): Promise<ApiResponse> => {
    const response = await fetchAPI("login", "POST", { email, password });
    return response as ApiResponse;
};

export const forgotPassword = async (email: string): Promise<ApiResponse> => {
    return await fetchAPI("forgot-password-token", "POST", { email });
};

export const resetPassword = async (
    token: string,
    email: string,
    password: string,
    passwordConfirmation: string
): Promise<ApiResponse> => {
    return await fetchAPI("new-password-token", "POST", {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
    });
};
