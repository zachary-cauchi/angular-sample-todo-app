export interface FullUser {
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    id: number,
}

export type User = Omit<FullUser, 'password'>;