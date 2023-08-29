"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintrc = void 0;
const eslintrc = () => {
    return `{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "latest"
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "env": {
    "es6": true
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/ban-ts-comment": [
      "off",
      {
        "ts-ignore": "allow-with-description"
      }
    ]
  }
}
`;
};
exports.eslintrc = eslintrc;
//# sourceMappingURL=eslintrc.json.js.map