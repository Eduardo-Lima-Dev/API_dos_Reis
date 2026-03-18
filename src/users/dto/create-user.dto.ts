export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    cell: string;
    role?: string;
}

export class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    cell?: string;
    role?: string;
}

export class FindUserDto {
    id?: string;
    name?: string;
    email?: string;
    cell?: string;
    role?: string;
}

export class DeleteUserDto {
    id: string;
}