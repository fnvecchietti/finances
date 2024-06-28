
export interface CreateUserDTO {
    username: string;
    password: string;
    name: string;
    last_name: string;
    birthday: Date;
    email: string;
}

export interface LoginUserDTO {
    username: string;
    password: string;
}