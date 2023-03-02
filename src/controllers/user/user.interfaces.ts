export interface GetUserDTO {
    email?: string;
    login?: string;
}

export interface UpdateUserDTO {
    userId: number;
    email?: string;
    login?: string;
    password?: string;
    role?: 'customer' | 'admin';
}

export interface DeleteUserDTO {
    userId: number;
}
