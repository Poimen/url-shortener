import { Request, Response } from 'express';

export class Controller {
  public async index(req: Request, res: Response): Promise<void> {
    res.json({ hello: 'world' });
  }
}

export default new Controller();
