import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
    {
        ignores: ["dist"],
    },
    {
        files: ["**/*.{js,jsx,ts,tsx,json}"],
        plugins: {
            react,
            "@typescript-eslint": typescriptPlugin,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: { jsx: true },
                sourceType: "module",
                project: "./tsconfig.json",
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...typescriptPlugin.configs.recommended.rules,
            ...reactHooks.configs["recommended-latest"].rules,
            ...reactRefresh.configs.vite.rules,
            "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
            "@typescript-eslint/no-unused-vars": ["error"],
            "react-refresh/only-export-components": "warn",
        },
    },
];
