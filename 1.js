let classNames = [
	'header', 'menu', 'menu-item', 'menu-item', 'footer', 'menu', 'link', 'link', 'link', 'link'
];

function getUniq(arr) {
	const uniq_count = arr.reduce((acc, elem) => {
		if (acc[elem]) acc[elem] += 1
		else acc[elem] = 1
		return acc;
	}, {})
	return Object.entries(uniq_count)
		.sort((a,b) => { 
			return b[1]-a[1]
		})
		.map((elem) => {
			return elem[0] 
		})
		
}

//console.log(getUniq(classNames));

let classNamesCount = {};

for (let i = 0; i < classNames.length; i++) {
	const current = classNames[i];
	if (classNamesCount[current]) {
		classNamesCount[current] += 1; 
	} else {
		classNamesCount[current] = 1;
	}
}
let result = Object.keys(classNamesCount).sort((a,b) => classNamesCount[b] - classNamesCount[a])
console.log(result);

// after Optimization:
/*
let classNamesCount = {};
let arrayUniq = [];

for (let i = 0; i < classNames.length; i++) {
	const current = classNames[i];
	if (classNamesCount[current]) {
		classNamesCount[current] += 1; 
	} else {
		classNamesCount[current] = 1;
		arrayUniq.push(current)
	}
}
let result = arrayUniq.sort((a,b) => classNamesCount[b] - classNamesCount[a])
console.log(result);
*/