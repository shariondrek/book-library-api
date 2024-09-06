import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { idSchema, postSchema, putSchema } from "../zod-schemas/genres.zod.schema";
import { GenresUseCase } from "../usecases/genres.usecase";


export async function genresRoutes(app: FastifyInstance) {
    const genresUseCase = new GenresUseCase()
    //find all
    app.get("/", async (req, reply) => {
        let resp = await genresUseCase.findAll();
        return resp
    })

    //find by id
    app.withTypeProvider<ZodTypeProvider>().get("/:id", idSchema, async (req, reply) => {
        const { id } = req.params

        let resp = await genresUseCase.find(id);
        return resp
    })

    //post
    app.withTypeProvider<ZodTypeProvider>().post("/", postSchema, async (req, reply) => {
        const { name } = req.body

        let resp = await genresUseCase.create(name);
        return resp
    })

    //update by id
    app.withTypeProvider<ZodTypeProvider>().put("/:id", putSchema, async (req, reply) => {
        const { id } = req.params
        const { name } = req.body

        let resp = await genresUseCase.update({id, name});
        return resp
    })

    //delete by id
    app.withTypeProvider<ZodTypeProvider>().delete("/:id", idSchema, async (req, reply) => {
        const { id } = req.params

        let resp = await genresUseCase.destroy(id);
        return resp
    })
}