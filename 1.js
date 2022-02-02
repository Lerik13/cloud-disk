// Найти пересечение 2-х массивов
// Find intersection of 2 arrays
const input1 = [1,2,2,1];
const input2 = [2,2];
// Output = [2,2]
const input3 = [4,9,5];
const input4 = [9,4,9,8,4];
// Output = [4,9] or [9,4]
// O(n*m)
const intersectMy  = function (nums1, nums2) {		
	const res = [];
	for (let i = 0; i < nums1.length; i++) {
		const current = nums1[i];
		for (let j = 0; j < nums2.length; j++) {
				if (current === nums2[j]) {
					res.push(current);
					nums2.splice(j, 1);
					break;
				}
		}
	}
	return res;
}

const intersect  = function (nums1, nums2) {	// O(n+m)	n = length of array1, m - length of array2
	const res = [];								// Complexity of memory = O(n)

	let map = nums1.reduce((acc, elem) => {
		acc[elem] = acc[elem] ? acc[elem] + 1 : 1;
		return acc;
	}, {})

	for (let i = 0; i < nums2.length; i++) {
		const current = nums2[i];
		let count = map[current];

		if (count && count>0) {
			map[current] -=  1;
			res.push(current);
		}
	}
	return res;
}
console.log(intersect(input1, input2));
console.log(intersect(input3, input4));

