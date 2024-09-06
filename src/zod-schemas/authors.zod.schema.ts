import { z } from "zod"

export const idSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int().min(1)
        })
    }
}

export const postSchema = {
    schema: {
        body: z.object({
            name: z.string().trim().min(1)
        })
    }
}

export const putSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int().min(1)
        }),
        body: z.object({
            name: z.string().trim().min(1)
        })
    }
}