function isRealName(name){
    return /^[\u4e00-\u9fa5·]{2,}$/.test(name);
}

function isRealIdCard(idCard) {
    if (!idCard || idCard.length != 18){
        return false;
    }
    idCard = idCard.toUpperCase();
    let sigma = 0,
        a = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        w = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    try {
        for (let i = 0; i < 17; i++) {
            let ai = parseInt(idCard.substring(i, i + 1)),
                wi = a[i];
            sigma += ai * wi;
        }
    }catch (e){
        return false;
    }
    let number = sigma % 11,
        check_number = w[number];
    return idCard.substring(17) == check_number;
}

export {
    isRealName, isRealIdCard
}

export default {
    isRealName, isRealIdCard
}
