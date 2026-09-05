import { HtmlBasePlugin } from "@11ty/eleventy";
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPassthroughCopy({ "src/css": "css", "src/admin": "admin", "src/images": "images", "src/search.json": "search.json" });
  eleventyConfig.addGlobalData("buildId", () => Date.now().toString(36));
  eleventyConfig.addGlobalData("today", () => new Date().toISOString().slice(0, 10));
  eleventyConfig.addFilter("year", (iso) => iso.slice(0, 4));
  eleventyConfig.addFilter("slugify2", (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  eleventyConfig.addFilter("inCat", (books, cat) => books.filter((b) => b.cats.includes(cat)));
  eleventyConfig.addFilter("bySlugs", (books, slugs) => books.filter((b) => slugs.includes(b.slug)));
  eleventyConfig.addFilter("recent", (books, n) => books.filter((b) => /\d{6}\.(jpe?g|png)$/i.test(b.cover)).sort((a, b) => { const d = (x) => { const m = /(\d{2})(\d{2})(\d{2})\.(?:jpe?g|png)$/i.exec(x.cover); return m ? m[3] + m[1] + m[2] : "0"; }; return d(b).localeCompare(d(a)); }).slice(0, n));
  return { dir: { input: "src", includes: "_includes", output: "_site" } };
}
