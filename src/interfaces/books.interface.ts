import { Author } from "../interfaces/authors.interface";
import { Genre } from "../interfaces/genres.interface";

export interface Book {
    id: number;
    name: string;
    image_url: string;
    release_date: Date;
    created_at: Date;
    updated_at: Date;
    authors: Author[];
    genres: Genre[];
}

export interface BookCreate {
    name: string;
    image_url: string;
    release_date: Date;
    authors: number[];
    genres: number[];
}

export interface BookUpdate {
    id: number;
    name: string;
    image_url: string;
    release_date: Date;
    authors: number[];
    genres: number[];
}

export interface BooksRepository {
    find(id: number): Promise<Book>
    findAll(): Promise<Book[]>
    create(book: BookCreate): Promise<Book>
    update(book: BookUpdate): Promise<Book>
    destroy(id: number): Promise<boolean>
}