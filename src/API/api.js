export default function getApi(page) {
	var json = require(`./CONTENTLISTINGPAGE-PAGE${page}.json`);
	return json.page;
}
