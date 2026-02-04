//plugins
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");
const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const interlinker = require("@photogabble/eleventy-plugin-interlinker");

module.exports = function (eleventyConfig) {

    // image transform
    // https://www.11ty.dev/docs/plugins/image/
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // which file extensions to process
        extensions: "html",
        // Add any other Image utility options here:
        // optional, output image formats
        formats: ["webp", "jpeg"],
        defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
    });
    
    // copy assets, original formats, not webp
    // eleventyConfig.addPassthroughCopy("src/assets");
    
    // copy robots.txt
    eleventyConfig.addPassthroughCopy("src/robots.txt");

    // navigation plugin
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // syntax highlighting plugin
    eleventyConfig.addPlugin(syntaxHighlight);

    // minify and inline css
    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });
    
    // filter tag list
    eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts", "tagList"].indexOf(tag) === -1);
	});

    // get all collection keys (tag names)
    eleventyConfig.addFilter("getKeys", function(obj) {
        return Object.keys(obj);
    });

    // for copyright notice
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // date for posts
    // https://github.com/11ty/eleventy-base-blog/
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

    // rss plugin
    eleventyConfig.addPlugin(pluginRss, {
        posthtmlRenderOptions: {}
    });

    // additional rss plugin functions
    eleventyConfig.addJavaScriptFunction("absoluteUrl", pluginRss.absoluteUrl);
    eleventyConfig.addJavaScriptFunction("htmlToAbsoluteUrls", pluginRss.convertHtmlToAbsoluteUrls);
    eleventyConfig.addJavaScriptFunction("dateToRfc3339", pluginRss.dateToRfc3339);
    eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);

    // split filter
    eleventyConfig.addFilter("split", function(str, separator) {
        return str.split(separator);
    });

    // tag list collection
    eleventyConfig.addCollection("tagList", function(collectionApi) {
        const tagsSet = new Set();
        collectionApi.getAll().forEach(item => {
            if ("tags" in item.data) {
                let tags = item.data.tags;
                tags = Array.isArray(tags) ? tags : [tags];
                tags.forEach(tag => tagsSet.add(tag));
            }
        });
        return [...tagsSet].sort();
    });

    // favicons
    eleventyConfig.addPassthroughCopy({ "src/_includes/favicons": "favicons" });
    eleventyConfig.addPassthroughCopy({ "src/_includes/favicons/favicon.ico": "favicon.ico" });

    // do wikilinks for Obsidian
    // https://github.com/photogabble/eleventy-plugin-interlinker
    eleventyConfig.addPlugin(interlinker);

    // output dir
    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};
