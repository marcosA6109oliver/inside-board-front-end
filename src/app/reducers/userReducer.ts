import { UserState } from "../types";

const initialState: UserState = {
    status: 0,
    success: false,
    data: {
        token: "",
        name: "",
        id: 0,
        email: "",
        role: "",
        teams: [],
    },
    message: "",
};

const userReducer = (state = initialState, action: any): UserState => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                data: action.payload,
                success: true,
                status: 200,
            };
        case "LOGOUT_USER":
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
