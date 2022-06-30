export interface User {
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    id: 1,
}

export type UserNoPassword = Omit<User, 'password'>;