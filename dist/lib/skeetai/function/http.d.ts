export declare const http = "import { onRequest } from 'firebase-functions/v2/https'\nimport { publicHttpOption } from '@/routings/options'\nimport { TypedRequestBody } from '@/types/http'\nimport { <functionNameParams> } from '@/types/http/<functionName>Params'\n\nexport const <functionName> = onRequest(publicHttpOption, async (req: TypedRequestBody<<functionNameParams>>, res) => {\n  try {\n    <yourScript>\n    res.json({\n      status: 'success'\n    })\n  } catch (error) {\n    res.status(500).json({ status: 'error', message: String(error) })\n  }\n})\n  ";
export declare const httpExample: {
    input: string;
    output: string;
};
