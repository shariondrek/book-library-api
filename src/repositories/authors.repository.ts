import { ClientError } from "../error-handler/clientError";
import { Author, AuthorsRepository, AuthorWithBooks } from "../interfaces/authors.interface";
import { prisma } from "../lib/prisma-client";

class AuthorsRepositoryPrisma implements AuthorsRepository {
    async find(id: number): Promise<AuthorWithBooks> {
        let resp = await prisma.authors.findUnique({
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
                        genres: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        authors: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })

        if (!resp) {
            throw new ClientError(404, "not found");
        }

        return resp
    }

    async findAll(): Promise<AuthorWithBooks[]> {
        let resp = await prisma.authors.findMany({
            include: {
                books: {
                    select: {
                        id: true,
                        name: true,
                        image_url: true,
                        release_date: true,
                        created_at: true,
                        updated_at: true,
                        genres: {
                            select: {
                                id: true,
                                name: true
                            },
                            orderBy: {
                                id: "asc"
                            }
                        },
                        authors: {
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
        });

        return resp
    }

    async create(name: string): Promise<Author> {
        let resp = await prisma.authors.create({ data: { name } })

        return resp
    }

    async update(author: Author): Promise<Author> {
        let resp = await prisma.authors.update({ where: { id: author.id }, data: { name: author.name } })

        return resp
    }

    async destroy(id: number): Promise<boolean> {
        let resp = await prisma.authors.delete({ where: { id } });

        return true
    }

}

export { AuthorsRepositoryPrisma }