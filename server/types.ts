export interface IUser {
    name: string;
    email: string;
    phone: String;
    verified: boolean;
    country: Enumerator | String;
}