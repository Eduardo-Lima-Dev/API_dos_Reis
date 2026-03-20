export class CreateReceptionistDto {
    name: string;
    email: string;
    password: string;
    cell: string;
    role: 'receptionist';
}

export class UpdateReceptionistDto {
    name?: string
    email?: string;
    password?: string;
    cell?: string;
    role?: 'receptionist';
}

export class FindReceptionistDto {
    id?: string;
    name?: string;
    email?: string;
    cell?: string;
    role?: 'receptionist';
}

export class DeleteReceptionistDto {
    id: string;
}