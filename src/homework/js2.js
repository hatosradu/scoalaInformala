/*
O functie "getDigits" care primeste un sir de caractere si returneaza cifrele din sirul respectiv
*/
function getDigits(array) {
    let result = "";
    for (let item of array) {
        if (!isNaN(item)) {
            result += item;
        }
    }

    return result;
}

/*
O functie "getLetters" care primeste un sir de caractere si returneaza doar literele din sirul respectiv
*/
function getLetters(array) {
    let result = "";
    for (let item of array) {
        let charCode = item.charCodeAt(0);
        if ((charCode >= 65 && charCode < 91) || (charCode >= 97 && charCode < 123)) {
            result += item;
        }
    }

    return result;
}

/*
O functie "getFirst5Letters" care primeste un sir de caractere si returneaza primele 5 litere(daca exista)
*/
function getFirst5Letters(array) {
    let result = "";
    for (let item of array) {
        let charCode = item.charCodeAt(0);
        if ((charCode >= 65 && charCode < 91) || (charCode >= 97 && charCode < 123)) {
            result += item;
        }

        if (result.length === 5) {
            return result;
        }
    }

    return result;
}

/*
O functie "concatenate" care primeste o lista de siruri de caractere si returneaza sirurile concatenate
*/
function concatenate(array) {
    let result = "";
    for (let arr of array) {
        for (let ch of arr) {
            result += ch;
        }
    }

    return result;
}

/*
O functie "getAllDigits" care primeste o lista de siruri de caractere si returneaza cifrele din toate sirurile
*/
function getAllDigits(array) {
    let result = "";
    for (let arr of array) {
        for (let ch of arr) {
            if (!isNaN(ch)) {
                result += ch;
            }
        }
    }

    return result;
}

/*
O functie "invertAllStrings" care primeste o lista de siruri de caractere si returneaza lista de siruri de caractere inversate
*/
function invertAllStrings(array) {
    let result = [];
    for (let item of array) {
        let mirrorString = "";
        for (let ch of item) {
            mirrorString = ch + mirrorString;
        }

        result.push(mirrorString);
    }

    return result;
}

/*
Calculeaza factorialul unui numar ("factorial")
*/
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }

    return result;
}

/*
Calculeaza cel mai mare divizor comun al 2 numere ("cmmdc")
*/
function cmmdc(a, b) {
    while (a != b) {
        if (a > b) {
            a -= b;
        } else {
            b -= a;
        }
    }

    return a;
}

/*
Calculeaza cel mai mic multiplu comun al 2 numere ("cmmmc")
*/
function cmmmc(a, b) {
    return a * b / cmmdc(a, b);
}

/*
Returneaza un array care sa contina toti divizorii unui numar (ex pentru 64: trebuie sa returneze [2,4,8,16,32]) ("divizori")
*/
function divizori(n) {
    let result = [];
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            result.push(i);
        }
    }

    return result;
}

/*
O functie care verifica daca un numar este palindrom (ex: 121, 1234321) ("palindrom")
*/
function palindrom(number) {
    let stringNumber = String(number);
    let len = stringNumber.length;

    for (let i = 0; i < len / 2; i++) {
        if (stringNumber[i] !== stringNumber[len - 1 - i]) {
            return false;
        }
    }

    return true;
}

/*
O functie care sorteaza numerele pare dintr-un sir de numere primit ca parametru. ("sort")
*/
function sort(array) {
    let result = [];
    let sortedArray = array.sort(function (a, b) { return a - b });
    for (let number of sortedArray) {
        if (number % 2 === 0) {
            result.push(number);
        }
    }
    return result;
}

/*
O functie care primeste ca parametru un array de numere. Aceasta sorteaza ascendent numerele pare si descendent numerele impare, in cadrul aceluiasi array primit ca parameru. ("sortAscDesc")
*/
function sortAscDesc(arr) {
    let positiveNumbers = [];
    let negativeNumber = [];

    for (let number of arr) {
        if (number % 2 === 0) {
            positiveNumbers.push(number);
        } else {
            negativeNumber.push(number);
        }
    }

    positiveNumbers = positiveNumbers.sort(function (a, b) { return a - b });
    negativeNumber = negativeNumber.sort(function (a, b) { return b - a });

    return positiveNumbers.concat(negativeNumber);

}


/*
O functie care primeste 2 parametri(un array si un numar). Folosind binary search verificati daca numarul primit ca parametru se gaseste in array. ("binarySearch")
*/
function binarySearch(arr, x) {
    let sortedArray = arr.sort(function (a, b) { return a - b });
    return binarySearchFunc(sortedArray, x, 0, arr.length - 1)
}

function binarySearchFunc(arr, x, start, end) {
    if (start > end) {
        return false
    };

    binarySearchFunctionCount += 1;

    let mid = Math.floor((start + end) / 2);
    if (arr[mid] === x) {
        return true
    };

    if (arr[mid] > x) {
        return binarySearchFunc(arr, x, start, mid - 1);
    }
    else {
        return binarySearchFunc(arr, x, mid + 1, end);
    }
}

/*
O functie care implementeaza binary search pentru a verifica daca un numar se regaseste intr-un array. 
Dupa ce se termina executia functiei trebuie sa returnati de cate ori s-a apelat functia recursiv ("countBinarySearch")
*/
let binarySearchFunctionCount = 0;

function countBinarySearch(arr, x){
    let sortedArray = arr.sort(function (a, b) { return a - b });
    binarySearchFunctionCount = 0;
    binarySearchFunc(sortedArray, x, 0, arr.length - 1)
    return binarySearchFunctionCount;
}
