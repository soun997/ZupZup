import fs from "fs";

const NOT_FOUND = "NOT FOUND";

async function makeTypeInfo() {
  // const classifyType = await fetch("./classify_type.json")
  //   .then((res) => res.json())
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // fs.readFile("classify_type.json", "utf-8", (err, data) => {
  //   if (err) {
  //     console.error("파일 읽기 중 오류 발생:", err);
  //   } else {
  //     classifyType = JSON.parse(data);
  //   }
  // });
  const jsonFile = fs.readFileSync("./classify_type.json", "utf-8");
  const classifyType = JSON.parse(jsonFile);
  console.log(classifyType);

  const nameMapFile = fs.readFileSync("./name_map.json", "utf-8");
  const nameMap = JSON.parse(nameMapFile);

  const keys = Object.keys(classifyType);
  const result = {};

  for (let i = 1; i < 60; i++) {
    const classType = findClass(classifyType, i, keys);
    if (classType === NOT_FOUND) {
      continue;
    }
    result[i] = {
      name: nameMap[i],
      "class-eng": classType,
      "class-kor": classifyType[classType].kor,
      desc: classifyType[classType].desc,
      coin: classifyType[classType].coin,
    };
  }

  const fileName = "trash_classification.json";
  const jsonData = JSON.stringify(result);
  fs.writeFile(fileName, jsonData, "utf-8", (err) => {
    if (err) {
      console.error("파일 작성 중 오류 발생:", err);
    } else {
      console.log("JSON 데이터가 파일로 저장되었습니다.");
    }
  });
}

/**
 * type 숫자를 넣었을 때 key값을 반환
 * @param { number } type
 */
function findClass(classifyType, typeNum, keys) {
  for (let key of keys) {
    const classifiedTypes = classifyType[key].type;
    for (let classifiedType of classifiedTypes) {
      if (classifiedType === typeNum) {
        return key;
      }
    }
  }
  return NOT_FOUND;
}

makeTypeInfo();
