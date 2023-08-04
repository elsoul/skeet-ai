import { fromGlobalId } from 'graphql-relay';
export const toPrismaId = (grobalId) => {
    try {
        const { id } = fromGlobalId(grobalId);
        return Number(id);
    }
    catch (error) {
        throw new Error(`Error in toPrismaId: ${error}`);
    }
};
//# sourceMappingURL=toPrismaId.js.map