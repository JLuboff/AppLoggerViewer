import {
  Request, Response, Router,
} from 'express';
import * as path from 'path';
import currentLogData from '../db/readQueries';

const router = Router();

router.route('/logMessages').get(async (req: Request, res: Response) => {
  try {
    const logMessages = await currentLogData();

    return res.json({ logMessages });
  } catch (error) {
    throw error;
  }
});

router.route('*').get((req: Request, res: Response) => res.sendFile(path.join(__dirname, '..', 'build/index.html')));

export = router;
