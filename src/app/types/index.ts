interface Pivot {
    user_id: number;
    team_id: number;
}

export interface Team {
    id: number;
    name: string;
    description: string;
    created_at: string | null;
    updated_at: string | null;
    pivot: Pivot;
}

export interface UserData {
    token: string;
    name: string;
    id: number;
    email: string;
    role: string;
    teams: Team[];
}

export interface ApiResponse {
    status: number;
    success: boolean;
    data?: UserData;
    message: string;
}

export interface UserState {
    status: number;
    success: boolean;
    data: UserData;
    message: string;
}

export interface RootState {
    user: UserState;
}
