import { buildFastify } from './app';

buildFastify().then((server) => {
  server.listen({ port: 3000 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server listening at ${address}`);
  });
});
