export interface IRoles {
    subscriber?: boolean;
    admin?: boolean;
}


export interface IUser {
    uid: string;
    email: string;
    photoURL: string;
    displayName?: string;
}
