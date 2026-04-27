import { ApiError } from "../errors/ApiError";
import { CalcadoRepository } from "../repositories/CalcadoRepository";
import type { CreateCalcadoDto, UpdateCalcadoDto } from "../dtos/CalcadoDTO";
import type { Calcado } from "@prisma/client";

export class CalcadoService {
  static async list(): Promise<Calcado[]> {
    return CalcadoRepository.findAll();
  }

  static async findById(id: number): Promise<Calcado> {
    const item = await CalcadoRepository.findById(id);

    if (!item) {
      throw new ApiError(404, "Produto não encontrado");
    }

    return item;
  }

  static async create(data: CreateCalcadoDto): Promise<unknown> {
    return CalcadoRepository.create(data);
  }

  static async update(id: number, data: UpdateCalcadoDto): Promise<unknown> {
    const item = await CalcadoRepository.findById(id);
    if (!item) {
      throw new ApiError(404, "Produto não encontrado");
    }

    return CalcadoRepository.update(id, data);
  }

  static async delete(id: number): Promise<unknown> {
    const item = await CalcadoRepository.findById(id);
    if (!item) {
      throw new ApiError(404, "Produto não encontrado");
    }

    return CalcadoRepository.delete(id);
  }

  static async findByTamanho(tamanho: number): Promise<Calcado[]> {
    if (tamanho <= 0) {
      throw new ApiError(400, "Tamanho deve ser um número positivo");
    }
    return CalcadoRepository.findByTamanho(tamanho);
  }

  static async findByMarca(marca: string): Promise<Calcado[]> {
    if (!marca || marca.trim().length === 0) {
      throw new ApiError(400, "Marca não pode ser vazia");
    }
    return CalcadoRepository.findByMarca(marca.trim());
  }

  static async getTotalEstoque(): Promise<{ total: number }> {
    const total = await CalcadoRepository.countTotal();
    return { total };
  }
}
