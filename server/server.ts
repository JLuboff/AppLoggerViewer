import compression from 'compression';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import routes from './routes/routes';
// import { sqlConfig } from './configs/configs';
// ////////////////////////////////////////
// Setup various middleware for server start
// ///////////////////////////////////////
const env = process.env.NODE_ENV;
const port = process.env.PORT || 3010;
const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

const app = express();
app.use(compression());
app.use(cors(corsOptions));

app.use(express.static('build'));
app.use(routes);
// app.use(errorHandler);
// ////////////////////////////////////////
// Handle various errors during production
// Kill process for uncaught/unhandled
// ///////////////////////////////////////
if (env === 'production') {
  process.on('uncaughtException', async () => {
    process.exit(1);
  });
  process.on('unhandledRejection', async () => {
    process.exit(1);
  });
}

app.listen(port, async () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on Port: ${port} in ${env} mode.`);
});
