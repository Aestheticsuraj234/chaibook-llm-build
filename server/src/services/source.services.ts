import { findSourcesByWorkspaceId } from "../repository/source.repository.js";
import { CreateSourceInput, ListSourcesQuery } from "../validators/source.validator.js";
import { getWorkspaceByIdForUser } from "./workspace.services.js";

async function assertWorkspaceAccess(workspaceId: string, userId: string) {
    await getWorkspaceByIdForUser(workspaceId, userId);
}

export async function listSourcesForWorkspace(
    workspaceId: string,
    userId: string,
    filters: ListSourcesQuery = {},
) {
    await assertWorkspaceAccess(workspaceId, userId);
    return findSourcesByWorkspaceId(workspaceId, filters);
}


export async function createTextOrMarkdownSource(
    workspaceId: string,
    userId: string,
    input: CreateSourceInput,
) {
    await assertWorkspaceAccess(workspaceId, userId);

    // return createAndProcessSource({
    //     workspaceId,
    //     type: input.type,
    //     title: input.title,
    //     content: input.content,
    //     status: "PENDING",
    // });
}