import type { Prisma } from "../generated/prisma/client.js";
import prisma from "../lib/db.js";
import { ListSourcesQuery } from "../validators/source.validator.js";

export const sourceSelect = {
    id: true,
    workspaceId: true,
    type: true,
    title: true,
    content: true,
    url: true,
    status: true,
    metadata: true,
    createdAt: true,
    updatedAt: true,
} as const;

export type SourceRecord = Prisma.SourceGetPayload<{
    select: typeof sourceSelect;
}>;

export function findSourcesByWorkspaceId(
    workspaceId: string,
    filters: ListSourcesQuery = {},
) {
    const where: Prisma.SourceWhereInput = { workspaceId };

    if (filters.type) {
        where.type = filters.type;
    }

    if (filters.status) {
        where.status = filters.status;
    }

    if (filters.q) {
        where.OR = [
            { title: { contains: filters.q, mode: "insensitive" } },
            { content: { contains: filters.q, mode: "insensitive" } },
        ];
    }

    return prisma.source.findMany({
        where,
        select: sourceSelect,
        orderBy: { createdAt: "desc" },
    });
}

export function findSourceByIdAndWorkspaceId(
    sourceId: string,
    workspaceId: string,
) {
    return prisma.source.findFirst({
        where: { id: sourceId, workspaceId },
        select: sourceSelect,
    });
}

export async function deleteSourceRecord(sourceId: string) {
    await prisma.source.delete({
        where: { id: sourceId },
    });
}
