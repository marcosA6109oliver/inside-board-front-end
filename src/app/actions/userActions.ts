// src/actions/userActions.ts

import { UserData } from "../types";

// Definição das constantes de tipo de ação
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";

// Tipagem para as ações
interface SetUserAction {
    type: typeof SET_USER;
    payload: UserData;
}

interface LogoutUserAction {
    type: typeof LOGOUT_USER;
}

// Ações tipadas
export const setUser = (userData: UserData): SetUserAction => ({
    type: SET_USER,
    payload: userData,
});

export const logoutUser = (): LogoutUserAction => ({
    type: LOGOUT_USER,
});

// Tipo para todas as ações do usuário
export type UserActionTypes = SetUserAction | LogoutUserAction;
