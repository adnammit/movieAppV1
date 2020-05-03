module.exports = {
	"root": true,
	"env": {
		"node": true
	},
	"extends": [
		"plugin:vue/essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"@vue/prettier",
		"@vue/prettier/@typescript-eslint"
	],
	"rules": {
		"prettier/prettier": [
			"error",
			{
				"singleQuote": true,
				"useTabs": true,
				"semi": true,
				"trailingComma": "es5",
				"printWidth": 180,
			}
		],
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
	},
	"parserOptions": {
		"parser": "@typescript-eslint/parser",
	},
	"overrides": [
		{
			"files": [
				"**/__tests__/*.{j,t}s?(x)",
				"**/tests/unit/**/*.spec.{j,t}s?(x)"
			],
			"env": {
				"mocha": true
			}
		}
	]
};