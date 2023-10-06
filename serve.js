import { Application, send } from 'https://deno.land/x/oak@v12.1.0/mod.ts';

const app = new Application({ logErrors: false });

app.use(async (context) => {
    try {
        await send(context, context.request.url.pathname, {
            root: `${Deno.cwd()}`,
            index: 'index.html',
        });
    } catch(e) {
        
    }
});

const port = Number(Deno.env.get('WEB_PORT')) || 5555;
console.log(`listening on port ${port}`);

await app.listen({ port });
