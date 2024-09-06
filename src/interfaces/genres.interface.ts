import { Book } from "./books.interface";

export interface Genre {
    id: number;
    name: string;
}

export interface GenreWithBooks {
    id: number;
    name: string;
    books: Book[];
}

export interface GenresRepository {
    find(id: number): Promise<GenreWithBooks>
    findAll(): Promise<GenreWithBooks[]>
    create(name: string): Promise<Genre>
    update(genre: Genre): Promise<Genre>
    destroy(id: number): Promise<boolean>
}