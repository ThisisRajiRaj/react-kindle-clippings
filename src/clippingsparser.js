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
        for (let i = highlights.length - 1; i >=0; i--) {
            let item = highlights[i];
            var title = item.title;
            var titleHighlights;

            if (grouped[title] === undefined) {
                titleHighlights = [];
                grouped[title] = titleHighlights;
            } else {
                titleHighlights = grouped[title];
            }

            titleHighlights.push({
                location: item.location,
                date:item.date,
                text: item.text
            });
        }
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
        var metachunks = metadata.split("|");
        let location = metadata;
        let date = "";
        if (metachunks.length > 1) {
            location = metachunks[0].replace("- Your ","");
            date = metachunks[1];
        }
        return {
            title: title,
            location: location,
            date:date,
            text: rest
        };
    }
}

export default ClippingsParser;