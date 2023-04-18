// src/types/auth.d.ts
export interface Auth {
    account: string;
    avatar: string;
    id: string;
    mobile: string;
    refreshToken: string;
    token: string;
}

type AuthResponse = HealthResponse<Auth>;