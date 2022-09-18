import { chnNumChar, chnUnitChar, ZERO, specialUnit } from "@/constant";

export const convertToChineseNumber = (num: number | string) => {
  if (isNaN(+num)) {
    throw Error("The parameter need to be number");
  }

  const validNumStr = parseFloat(num + "").toString();
  let chnIntStr = validNumStr;
  let chnDecimalStr = "";
  let chnStr = "";

  if (validNumStr.includes(".")) {
    const arr = validNumStr.split(".");
    chnIntStr = arr[0];
    chnDecimalStr = arr[1];
  }

  while (chnIntStr.length > 0) {
    const tmpNum = chnNumChar[parseInt(chnIntStr.slice(0, 1))];
    const tmpUnit = chnUnitChar[chnIntStr.length - 1];
    // 处理中间多个零的情况
    chnStr += chnStr.slice(-1) == ZERO && tmpNum == ZERO ? "" : tmpNum;
    chnStr += tmpNum == ZERO ? "" : tmpUnit;

    // 处理100001这种case,首次执行完毕chnStr:一十 此时tmpUnit为万但tmpNum为零,不会追加unit,需要特殊处理
    if (tmpNum == ZERO && specialUnit.indexOf(tmpUnit) !== -1) {
      // 截掉追加的零
      if (chnStr.slice(-1) == ZERO) {
        chnStr = chnStr.slice(0, chnStr.length - 1);
      }
      chnStr += tmpUnit;
    }
    chnIntStr = chnIntStr.slice(1);
  }

  if (chnStr) {
    // 去掉末尾的零
    if (chnStr.slice(-1) === ZERO) {
      chnStr = chnStr.slice(0, chnStr.length - 1);
    }
    // 特殊case
    if (chnStr.slice(0, 2) == "一十") {
      chnStr = chnStr.slice(1);
    }
  }

  if (chnDecimalStr) {
    chnStr += "点";
    while (chnDecimalStr) {
      chnStr += chnNumChar[+chnDecimalStr.slice(0, 1)];
      chnDecimalStr = chnDecimalStr.slice(1);
    }
  }

  return chnStr;
};
