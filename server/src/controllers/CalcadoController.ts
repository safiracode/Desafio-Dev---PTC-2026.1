import { Request, Response, NextFunction } from "express";
import { CalcadoService } from "../services/CalcadoService";
import { ApiError } from "../errors/ApiError";

export class CalcadoController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await CalcadoService.list();
      return res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        throw new ApiError(400, "ID inválido");
      }
      const item = await CalcadoService.findById(id);
      return res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await CalcadoService.create(req.body);
      return res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        throw new ApiError(400, "ID inválido");
      }
      const item = await CalcadoService.update(id, req.body);
      return res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        throw new ApiError(400, "ID inválido");
      }
      await CalcadoService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async getByTamanho(req: Request, res: Response, next: NextFunction) {
    try {
      const tamanho = Number(req.params.tamanho);
      if (Number.isNaN(tamanho) || tamanho <= 0) {
        throw new ApiError(400, "Tamanho deve ser um número positivo");
      }
      const items = await CalcadoService.findByTamanho(tamanho);
      return res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async getByMarca(req: Request, res: Response, next: NextFunction) {
    try {
      const marca = req.params.marca;
      if (!marca || marca.trim().length === 0) {
        throw new ApiError(400, "Marca não pode ser vazia");
      }
      const items = await CalcadoService.findByMarca(marca);
      return res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async getTotalEstoque(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CalcadoService.getTotalEstoque();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
