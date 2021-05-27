var table = [];
for(var i=0; i<8; i++) {
    table[i] = [];
    for(var j=0; j<8; j++) {
        table[i][j] = undefined;
    }
}



// coloring the table
table[1][0] = 'red';	
table[2][3] = 'red';	
table[3][6] = 'red';	
table[0][5] = 'red';	

table[0][2] = 'purple';	
table[1][7] = 'purple';	
table[2][4] = 'purple';	
table[3][1] = 'purple';	

table[0][6] = 'green';	
table[1][3] = 'green';	
table[2][0] = 'green';	
table[3][5] = 'green';	

for (let i = 0; i < 4; i++) {
	table[i][i] = 'orange';
	table[i][7-i] = '#663300'; //brown	
	table[i][i+4] = 'yellow';	
	table[i][3-i] = 'pink';
}
// first half finished
// mirroring the second half
for (let i = 4; i < 8; i++) {
	for (let j = 0 ; j < 8; j++) {
		table[i][j] =
			table[7-i][7-j];
}
}

console.log(table[1][1]);
