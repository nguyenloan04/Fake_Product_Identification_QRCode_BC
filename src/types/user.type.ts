
export type User = {
    email: string,
    password: string,
    name: string,
    role: number,
}
export type UserType ={
    email:  string,
    password: string,
    name: string,
    role: number,
};

export type UserDataLoader = Record<
    string,
    UserType
>;
