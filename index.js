const express = require('express');
const compression = require('compression');
const PORT = process.env.PORT || 5000;
const path = require('path');
const app = express();
const http = require('http');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: 'ATTR' });
const url = 'http://www.peto-media.fi/tiedotteet/rss.xml';

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/api/alerts', (request, response) => {
	let req = http.get(url, res => {
		let data = '';
		res.setEncoding('latin1');
		res.on('data', stream => {
			data += stream;
		});
		res.on('end', () => {
			parser.parseString(data, (err, res) => {
				if (err === null) {
					response.send(res);
				} else {
					console.log(err);
				}
			});
		});
	});
});

app.use(compression);
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});
