import { Book, BookCreate, BookUpdate } from "../interfaces/books.interface";
import { BooksRepositoryPrisma } from "../repositories/books.repository";

class BooksUseCase {
    private booksRepository: BooksRepositoryPrisma;

    constructor() {
        this.booksRepository = new BooksRepositoryPrisma()
    }

    async findAll(): Promise<Book[]> {
        return this.booksRepository.findAll()
    }

    async find(id: number): Promise<Book> {
        return this.booksRepository.find(id)
    }

    async create(data: BookCreate): Promise<Book> {

        return this.booksRepository.create(data)
    }

    async update(data: BookUpdate): Promise<Book> {

        return this.booksRepository.update(data)
    }

    async destroy(id: number): Promise<boolean> {
        return this.booksRepository.destroy(id)
    }
}

export { BooksUseCase }