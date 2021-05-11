
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    name: string;
    phoneNo: string;
    age: number;
}

export class User {
    id: string;
    name: string;
    phoneNo: string;
    age?: number;
}

export abstract class IQuery {
    abstract sayHello(): string | Promise<string>;
}

export abstract class IMutation {
    abstract addUser(args: CreateUserInput): User | Promise<User>;
}
