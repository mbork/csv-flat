// Unflatten a csv file

const csvsync = require('csvsync');
const fs = require('fs');

let data = [];
let max_column =0;
let max_row = 0;

const line_to_cell = function line_to_cell(line) {
	let match = line.match(/^([A-Z]+)([0-9]+):(.*$)/);
	if (match && match.length === 4) {
		let [, col_name, row_number, content] = match;
		let row = parseInt(row_number, 10) - 1;
		let col = col_number(col_name) - 1;
		if (!data[row]) {
			data[row] = [];
		}
		if (!data[row][col]) {
			data[row][col] = content;
		} else {
			data[row][col] += ('\n' + content);
		}
	};
}

let lines = fs.readFileSync(0, 'utf-8').split('\n').map(line_to_cell);
process.stdout.write(csvsync.stringify(data));

// see https://stackoverflow.com/a/46173864/1181665
function col_number(name) {
	return name.split('').reduce((r, a) => r * 26 + parseInt(a, 36) - 9, 0)
}
