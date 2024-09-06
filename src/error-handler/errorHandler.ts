import { FastifyInstance } from "fastify";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { ClientError } from "./clientError";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {

    if (error instanceof ClientError) {
        if (error.code == 404) {
            return reply.status(404).send(error.message);
        }
        if (error.code == 400) {
            return reply.status(400).send(error.message)
        }
    }

    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
            return reply.status(400).send({ error: "duplicate entry", target: error.meta?.target })
        }
        if (error.code == "P2025") {
            return reply.status(404).send("not found")
        }
    }

    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "invalid input", errors: error.flatten().fieldErrors })
    }

    console.log(`instance of: ${error.constructor.name}, error: ${error}`);
    reply.status(500).send({ message: "Internal server error" });
}