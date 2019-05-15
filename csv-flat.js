// Flatten a csv file

const csvsync = require('csvsync');
const fs = require('fs');

let data = csvsync.parse(fs.readFileSync(0, 'utf-8'));
data.forEach((row, i) => {
	row.forEach((cell, j) => {
		console.log(`${col_name(j)}${i+1}:${escape(cell)}`);
	});
});

// see https://stackoverflow.com/a/48196105/1181665
function col_name(i) {
	const previousLetters = (i >= 26 ? col_name(Math.floor(i / 26) -1) : '');
	const lastLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i % 26];
	return previousLetters + lastLetter;
}

function escape(string) {
	return string.replace(/\\/g, '\\\\').replace(/\n/g, '\\n');
}
