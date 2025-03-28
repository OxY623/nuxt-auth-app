export interface User {
    id: number,
    username: string,
    password: string
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
    user: User | null,
    isAuthenticated: boolean,
}