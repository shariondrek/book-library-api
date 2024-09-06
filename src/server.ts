import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { authorsRoutes } from './routes/authors.routes';
import { genresRoutes } from './routes/genres.routes';
import { booksRoutes } from './routes/books.routes';
import { errorHandler } from './error-handler/errorHandler';

const port: number = 3333
const host: string = "localhost"

const app = fastify()
app.setErrorHandler(errorHandler)

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(authorsRoutes, {
    prefix: "/authors"
})

app.register(genresRoutes, {
    prefix: "/genres"
})

app.register(booksRoutes, {
    prefix: "/books"
})


app.listen({ port, host }).then(() => {
    console.log(`server running on http://${host}:${port}`)
})