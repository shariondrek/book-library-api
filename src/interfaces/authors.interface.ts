import { Book } from "./books.interface";

export interface Author {
    id: number;
    name: string;
}

export interface AuthorWithBooks{
    id: number;
    name: string;
    books: Book[]
}



export interface AuthorsRepository {
    find(id: number): Promise<AuthorWithBooks>
    findAll(): Promise<AuthorWithBooks[]>
    create(name: string): Promise<Author>
    update(author: Author): Promise<Author>
    destroy(id: number): Promise<boolean>
}