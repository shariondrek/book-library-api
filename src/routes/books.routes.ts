import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { idSchema, postSchema, putSchema } from "../zod-schemas/books.zod.schema";
import { BooksUseCase } from "../usecases/books.usecase";
import { Book, BookCreate, BookUpdate } from "../interfaces/books.interface";


export async function booksRoutes(app: FastifyInstance) {
    const booksUseCase = new BooksUseCase()
    //find all
    app.get("/", async (req, reply) => {
        let resp = await booksUseCase.findAll();
        return resp
    })

    //find by id
    app.withTypeProvider<ZodTypeProvider>().get("/:id", idSchema, async (req, reply) => {
        const { id } = req.params

        let resp = await booksUseCase.find(id);
        return resp
    })

    //post
    app.withTypeProvider<ZodTypeProvider>().post("/", postSchema, async (req, reply) => {
        const { image_url, name, release_date, authors, genres } = req.body

        let resp = await booksUseCase.create({ image_url, name, release_date, authors, genres });
        return resp
    })

    //update by id
    app.withTypeProvider<ZodTypeProvider>().put("/:id", putSchema, async (req, reply) => {
        const { id } = req.params
        const { name, image_url, release_date, authors, genres } = req.body

        let resp = await booksUseCase.update({ id, image_url, name, release_date, authors, genres });
        return resp
    })

    //delete by id
    app.withTypeProvider<ZodTypeProvider>().delete("/:id", idSchema, async (req, reply) => {
        const { id } = req.params

        let resp = await booksUseCase.destroy(id);
        if(!resp){
            throw new Error(`Internal error, failed to delete? book id ${id}`)
        }
        return reply.status(204).send()
    })
}