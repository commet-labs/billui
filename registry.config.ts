import type { PluginOptions } from "fumadocs-registry";

export default {
  baseUrl: "https://billui.com/r",
  registry: {
    name: "billui",
    homepage: "https://billui.com",
  },
  componentsDirs: [
    { name: "ui", type: "ui" },
    { name: "animated", type: "ui" },
    { name: "lib", type: "lib" },
  ],
  docsDirs: ["content/docs/components", "content/docs/animated"],
} satisfies PluginOptions;
