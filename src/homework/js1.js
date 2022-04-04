/*
O functie "equals" care primeste 2 parametrii si returneaza daca cei 2 parametrii sunt egali, strict
*/
function equals(a, b) {
    return a === b;
}

/*
O functie "compare" care primeste 2 parametrii si returneaza -1 daca primul e mai mic ca al doilea, 0 daca sunt egale si 1 daca primul e mai mare ca al doilea
*/
function compare(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0
    }
}

/* 
O functie "max" care primeste 2 parametrii si returneaza maximul dintre cele 2
*/
function max(a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

/*
O functie "min" care primeste 2 parametrii si returneaza minimul dintre cele 2
*/
function min(a, b) {
    if (a < b) {
        return a;
    } else {
        return b;
    }
}

/*
O functie "suma" care primeste 1 parametru, numar intreg si returneaza suma primelor N numere naturale pozitive (exemplu: daca N este 3, trebuie sa returneze 6)
*/
function suma(n) {
    let result = 0;
    for (let x = 1; x <= n; x++) {
        result += x;
    }

    return result;
}

/*
O functie "prim" care primeste 1 parametru si returneaza true/false daca N este numar prim sau nu (restul impartirii la 1 si la N ==0)
*/
function prim(number) {
    for (let i = 2; i < number; i++) {
        if (number % i == 0) {
            return false;
        }
    }

    return true;
}


// functie "sumaPrime" care primeste 1 parametru si returneaza suma primelor N numere prime (pentru N=5 trebuie sa returneze 2+3+5+7+11=28)
function sumaPrime(n) {
    let result = 0;
    let primeNumbers = [];
    let index = 2;

    while (primeNumbers.length < n) {
        if (prim(index)) {
            primeNumbers.push(index);
        }

        index += 1;
    }

    for (let i = 0; i < primeNumbers.length; i++) {
        result += primeNumbers[i];
    }

    return result;
}


/*
O functie "invers" care primeste un parametru de tip numar si intoarce inversul acestuia (ca numar) (123 => 321)
*/
function invers(n) {
    let result = "";
    let number = String(n);
    for (let digit of number) {
        result = digit + result;
    }

    return Number(result);
}

/*
O functie "produsImpare" care primeste 1 parametru si returneaza produsul primelor N numere impare pozitive (pentru N=5; returneaza 1*3*5*7*9=945)
*/
function produsImpare(n) {
    let result = 1;
    for (let i = 1; i <= n * 2; i += 2) {
        result = result * i;
    }

    return result;
}

/*
O functie "contains" care primeste 2 parametri(arr - array de nr intregi si x - numar) si verifica daca x exista in array (rezultatul este true/false)
*/
function contains(arr, x) {
    for (let item of arr) {
        if (item === x) {
            return true;
        }
    }

    return false;
}

/*
O functie "maxArray" care primeste un array si returneaza valoarea maxima (ar trebui sa functioneze si pentru numere si pentru stringuri)
*/
function maxArray(array) {
    let result = array[0];
    for (let item of array) {
        if (item > result) {
            result = item;
        }
    }

    return result;
}

/*
O functie "sumMinMax" care primeste un array de numere si returneaza suma dintre valoare maxima si valoare minima
*/
function sumMinMax(array) {
    let minValue = array[0];
    for (let item of array) {
        if (item < minValue) {
            minValue = item;
        }
    }

    let maxValue = array[0];
    for (let item of array) {
        if (item > maxValue) {
            maxValue = item;
        }
    }

    return minValue + maxValue;
}

/*
O functie "hasDuplicates" care primeste un array si returneaza daca exista duplicate intr-un array primit ca parametru (true/false)
*/
function hasDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (i !== j) {
                if (array[i] === array[j]) {
                    return true;
                }
            }
        }
    }

    return false;
}

/*
O functie "produsPozitive" care primeste un array si returneaza produsul numerelor pozitive intr-un array primit ca parametru
*/
function produsPozitive(array) {
    let result = 1;
    for (let item of array) {
        if (item > 0) {
            result *= item;
        }
    }

    return result;
}


/*
O functie "palindrom" care primeste un string si returneaza daca este palindrom (inversul == originalul, ex: "1234321", "55", "787") (true/false)
*/
function palindrom(text) {
    let mirrorString = "";
    for (let item of text) {
        mirrorString = item + mirrorString;
    }

    return text === mirrorString;
}