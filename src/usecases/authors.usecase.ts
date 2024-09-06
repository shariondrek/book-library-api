import { Author, AuthorWithBooks } from "../interfaces/authors.interface";
import { AuthorsRepositoryPrisma } from "../repositories/authors.repository";

class AuthorsUseCase {
    private authorsRepository: AuthorsRepositoryPrisma;

    constructor() {
        this.authorsRepository = new AuthorsRepositoryPrisma();
    }

    async findAll(): Promise<AuthorWithBooks[]> {
        return this.authorsRepository.findAll()
    }

    async find(id: number): Promise<AuthorWithBooks> {
        return this.authorsRepository.find(id)
    }

    async create(name: string): Promise<Author> {
        return this.authorsRepository.create(name)
    }

    async update(author: Author): Promise<Author> {
        return this.authorsRepository.update(author)
    }

    async destroy(id: number): Promise<boolean> {
        return this.authorsRepository.destroy(id)
    }
}

export { AuthorsUseCase }