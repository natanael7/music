var shell = require('shelljs');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const file = 'file.txt';
const writeFile = fs.createWriteStream(file);

function write(text) {
	writeFile.write(`MYVARIABLE="https://www.youtube.com`+text+`"`)
}
process.argv.forEach(function (val, index, array) {
    if (index == array.length - 1){
        array.shift();
        array.shift();
        let param = array.join(' ')
		request(`https://www.youtube.com/results?search_query=${param}`, (error, response, html) => {
			if (!error && response.statusCode == 200) {
				const $ = cheerio.load(html);
				const object = $('.contains-addto').find('a').attr('href');

				write(object);
			}
		});
    }
});
