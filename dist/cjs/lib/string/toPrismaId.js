"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPrismaId = void 0;
const graphql_relay_1 = require("graphql-relay");
const toPrismaId = (grobalId) => {
    try {
        const { id } = (0, graphql_relay_1.fromGlobalId)(grobalId);
        return Number(id);
    }
    catch (error) {
        throw new Error(`Error in toPrismaId: ${error}`);
    }
};
exports.toPrismaId = toPrismaId;
//# sourceMappingURL=toPrismaId.js.map