export interface IUser {
    name: "string",
    surname: "string",
    credentials: {
        "username": "string",
        "passphrase": "string"
    },
    "active": boolean,
    "created": "string",
    "_comment": "string"
}

export interface User extends IUser {
    id: string;
}

export interface AuthActions {
    login(username: string, password: string): Promise<boolean>;
    logout(): void; 
    initAuth(): void;
    getCurrentUser(): User | void;
}

export interface Product {
    id: number,
    name: string,
    category: string,
    price: number,
    status: 'active' | 'inactive',
    date_created: string,
    description: string
}

export interface AuthState {
    users: IUser[];
    user: User | null;
    isAuthenticated: boolean;
}