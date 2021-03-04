module.exports = function check(str, bracketsConfig) {
    if ((typeof str !== 'string') || (!Array.isArray(bracketsConfig))) {
        return false;
    }
    let stack = [];
    let bracketsOpen = bracketsConfig.map(a => a[0]);
    let bracketsClose = bracketsConfig.map(a => a[1]);
    for (let i = 0; i < str.length; i++) {
        let current = str[i];
        idxOpen     = bracketsOpen.indexOf(current);
        idxClose    = bracketsClose.indexOf(current);
        if ((idxOpen >= 0) && (idxClose >= 0)) {
            if (stack.length > 0) {
                if (stack[stack.length-1] == current) {
                    stack.pop();
                } else {
                    stack.push(current);
                }
            } else {
                stack.push(current);
            }
        } else if ((idxOpen >= 0) && (idxClose == -1)) {
            stack.push(current);
        } else if ((idxOpen == -1) && (idxClose >= 0)) {
            let bracketOpen = bracketsOpen[idxClose];
            if (stack.length > 0) {
                if (stack[stack.length-1] == bracketOpen) {
                    stack.pop();
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    if (stack.length > 0) {
        return false;
    }
    return true;
}
