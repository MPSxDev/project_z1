import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "LeadsMaster-byYieldge/**",
      ".agents/**",
      ".claude/**",
      ".cursor/**",
      "features/**",
    ],
  },
  {
    rules: {
      // Disable overly strict React compiler rules that flag legitimate patterns
      // like setting document.cookie and window.location.href for navigation
      "react-hooks/immutability": "off",
      // Allow setState in effects for URL parameter reading patterns
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
