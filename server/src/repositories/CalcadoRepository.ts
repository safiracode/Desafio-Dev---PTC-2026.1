import prisma from "../database";
import type { Calcado, Prisma } from "@prisma/client";

export const CalcadoRepository = {
  findAll: async (): Promise<Calcado[]> => {
    return prisma.calcado.findMany();
  },

  findById: async (id: number): Promise<Calcado | null> => {
    return prisma.calcado.findUnique({
      where: {
        id,
      },
    });
  },

  create: async (data: Prisma.CalcadoCreateInput): Promise<Calcado> => {
    return prisma.calcado.create({
      data,
    });
  },

  update: async (
    id: number,
    data: Prisma.CalcadoUpdateInput
  ): Promise<Calcado> => {
    return prisma.calcado.update({
      where: {
        id,
      },
      data,
    });
  },

  delete: async (id: number): Promise<Calcado> => {
    return prisma.calcado.delete({
      where: {
        id,
      },
    });
  },

  findByTamanho: async (tamanho: number): Promise<Calcado[]> => {
    return prisma.calcado.findMany({
      where: {
        tamanho,
      },
    });
  },

  findByMarca: async (marca: string): Promise<Calcado[]> => {
    return prisma.calcado.findMany({
      where: {
        marca: {
          equals: marca,
          mode: "insensitive",
        },
      },
    });
  },

  countTotal: async (): Promise<number> => {
    const result = await prisma.calcado.aggregate({
      _sum: {
        quantidade_em_estoque: true,
      },
    });
    return result._sum.quantidade_em_estoque || 0;
  },
};
