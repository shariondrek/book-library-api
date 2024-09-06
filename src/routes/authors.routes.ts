import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { idSchema, postSchema, putSchema } from "../zod-schemas/authors.zod.schema";
import { AuthorsUseCase } from "../usecases/authors.usecase";


export async function authorsRoutes(app: FastifyInstance) {
    const authorsUseCase = new AuthorsUseCase()

    //find all
    app.get("/", async (req, reply) => {
        let resp = await authorsUseCase.findAll();
        return resp
    })

    //find by id
    app.withTypeProvider<ZodTypeProvider>().get("/:id", idSchema, async (req, reply) => {
        const { id } = req.params

        let resp = await authorsUseCase.find(id);
        return resp
    })

    //post
    app.withTypeProvider<ZodTypeProvider>().post("/", postSchema, async (req, reply) => {
        const { name } = req.body

        let resp = await authorsUseCase.create(name);
        return resp
    })

    //update by id
    app.withTypeProvider<ZodTypeProvider>().put("/:id", putSchema, async (req, reply) => {
        const { id } = req.params
        const { name } = req.body

        let resp = await authorsUseCase.update({id, name})
        return resp
    })

    //delete by id
    app.withTypeProvider<ZodTypeProvider>().delete("/:id", idSchema, async (req, reply) => {
        const { id } = req.params
        
        let resp = await authorsUseCase.destroy(id)
        return resp
    })
}