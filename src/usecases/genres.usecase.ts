import { Genre, GenreWithBooks } from "../interfaces/genres.interface";
import { GenresRepositoryPrisma } from "../repositories/genres.repository";

class GenresUseCase {
    private genresRepository: GenresRepositoryPrisma;

    constructor() {
        this.genresRepository = new GenresRepositoryPrisma();
    }

    async findAll(): Promise<GenreWithBooks[]> {
        return this.genresRepository.findAll()
    }

    async find(id: number): Promise<GenreWithBooks> {
        return this.genresRepository.find(id)
    }

    async create(name: string): Promise<Genre> {
        return this.genresRepository.create(name)
    }

    async update(genre: Genre): Promise<Genre> {
        return this.genresRepository.update(genre)
    }

    async destroy(id: number): Promise<boolean> {
        return this.genresRepository.destroy(id)
    }
}

export { GenresUseCase }