export interface FullUser {
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    id: 1,
}

export type User = Omit<FullUser, 'password'>;