import { ClientError } from "../error-handler/clientError";
import { Genre, GenresRepository, GenreWithBooks } from "../interfaces/genres.interface";
import { prisma } from "../lib/prisma-client";

class GenresRepositoryPrisma implements GenresRepository {
    async find(id: number): Promise<GenreWithBooks> {
        let resp = await prisma.genres.findUnique({
            where: { id },
            include: {
                books: {
                    select: {
                        id: true,
                        name: true,
                        image_url: true,
                        release_date: true,
                        created_at: true,
                        updated_at: true,
                        authors: {
                            select: {
                                id: true,
                                name: true
                            },
                            orderBy: {
                                id: "asc"
                            }
                        },
                        genres: {
                            select: {
                                id: true,
                                name: true
                            },
                            orderBy: {
                                id: "asc"
                            }
                        }
                    }
                }
            }
        })

        if (!resp) {
            throw new ClientError(404, "not found")
        }

        return resp
    }

    async findAll(): Promise<GenreWithBooks[]> {
        let resp = await prisma.genres.findMany({
            include: {
                books: {
                    select: {
                        id: true,
                        name: true,
                        image_url: true,
                        release_date: true,
                        created_at: true,
                        updated_at: true,
                        authors: {
                            select: {
                                id: true,
                                name: true
                            },
                            orderBy: {
                                id: "asc"
                            }
                        },
                        genres: {
                            select: {
                                id: true,
                                name: true
                            },
                            orderBy: {
                                id: "asc"
                            }
                        }
                    }
                }
            },
            orderBy: { id: "asc" }
        })

        return resp
    }

    async create(name: string): Promise<Genre> {
        let resp = await prisma.genres.create({ data: { name } })

        return resp
    }

    async update(genre: Genre): Promise<Genre> {
        let resp = await prisma.genres.update({ where: { id: genre.id }, data: { name: genre.name } })

        return resp
    }

    async destroy(id: number): Promise<boolean> {
        let resp = await prisma.genres.delete({ where: { id } })

        return true
    }
}

export { GenresRepositoryPrisma }