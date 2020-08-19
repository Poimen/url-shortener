import { Request, Response } from 'express';

export class Controller {
  public async index(req: Request, res: Response): Promise<void> {
    res.redirect('http://google.com');
  }
}

export default new Controller();
