//
// Parse Kindle clippings file. Code adapted from
// https://github.com/sole/kindle-clippings-parser
//
class ClippingsParser {

    // Main entry point
    async parse(url) {
        let response = await fetch(url);
        let text = await response.text();
        var chunks = text.split('==========');
        var highlights = chunks.map(this.parseHighlight).filter(function (highlight) {
            return highlight !== false;
        });
        
        var grouped = {};
        highlights.forEach(function (item) {
            var title = item.title;
            var titleHighlights;

            if (grouped[title] === undefined) {
                titleHighlights = [];
                grouped[title] = titleHighlights;
            } else {
                titleHighlights = grouped[title];
            }

            titleHighlights.push({
                metadata: item.metadata,
                text: item.text
            });
        });
        
        return grouped;
        
    }

    // Return just the highlights, not the notes
    parseHighlight(text) {
        var trimmed = text.trim();
        var lines = trimmed.split('\n');
        var title = lines[0].trim();
        var metadata = lines[1];
        var rest = lines.slice(2);

        // Only return highlights
        if (title.length === 0 || !metadata.startsWith("- Your Highlight")) {
            return false;
        }

        if (rest !== undefined) {
            rest = rest.join('\n').trim();
        }
        return {
            title: title,
            metadata: metadata,
            text: rest
        };
    }

    // Group highlights by title
    groupHighlights(items) {
        var grouped = {};
        items.forEach(function (item) {
            var title = item.title;
            var titleHighlights;

            if (grouped[title] === undefined) {
                titleHighlights = [];
                grouped[title] = titleHighlights;
            } else {
                titleHighlights = grouped[title];
            }

            titleHighlights.push({
                metadata: item.metadata,
                text: item.text
            });
        });
        return grouped;
    }
}

export default ClippingsParser;