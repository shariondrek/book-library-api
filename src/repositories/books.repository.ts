import { ClientError } from "../error-handler/clientError";
import { Book, BookCreate, BooksRepository, BookUpdate } from "../interfaces/books.interface";
import { prisma } from "../lib/prisma-client";

class BooksRepositoryPrisma implements BooksRepository {
    async find(id: number): Promise<Book> {
        let resp = await prisma.books.findUnique({ where: { id }, include: { authors: { orderBy: { id: "asc" } }, genres: { orderBy: { id: "asc" } } } })

        if (!resp) {
            throw new ClientError(404, "not found")
        }

        return resp
    }

    async findAll(): Promise<Book[]> {
        let resp = await prisma.books.findMany({ include: { authors: { orderBy: { id: "asc" } }, genres: { orderBy: { id: "asc" } } }, orderBy: { id: "asc" } })

        return resp
    }

    async create(book: BookCreate): Promise<Book> {
        let resp = await prisma.books.create({
            data: {
                name: book.name,
                image_url: book.image_url,
                release_date: book.release_date,
                authors: {
                    connect: book.authors.map(id => ({ id })),
                },
                genres: {
                    connect: book.genres.map(id => ({ id }))
                }
            },
            include: {
                authors: { orderBy: { id: "asc" } },
                genres: { orderBy: { id: "asc" } }
            }
        });

        return resp
    }

    async update(book: BookUpdate): Promise<Book> {
        let resp = await prisma.books.update({
            where: {
                id: book.id
            },
            data: {
                name: book.name,
                image_url: book.image_url,
                release_date: book.release_date,
                authors: {
                    set: [],
                    connect: book.authors.map(id => ({ id })),
                },
                genres: {
                    set: [],
                    connect: book.genres.map(id => ({ id }))
                }
            },
            include: {
                authors: { orderBy: { id: "asc" } },
                genres: { orderBy: { id: "asc" } }
            }
        });

        return resp
    }

    async destroy(id: number): Promise<boolean> {
        let resp = await prisma.books.delete({ where: { id } });

        return true
    }


}

export { BooksRepositoryPrisma }