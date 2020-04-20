import { RolInterface } from './RolInterface';

export class User {

    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    rolId?: number;
    rol?: RolInterface;
}
