const MY_POSSESSION_CD_LIST_KEY = "my_possession_cd_list";

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    addaveItemButton();
  }
});

// 「所持CDの更新」ボタンをページに追加する
function addaveItemButton() {
  const h1Element = document.querySelector("#mypage_possession h1");
  if (!h1Element) return;

  const button = createButton("所持CDの更新");
  h1Element.insertAdjacentElement("afterend", button);
  button.addEventListener("click", savePossessionCdList);
}

// ボタンのテキストやデザインを設定する
function createButton(text = "button", floatStyle = "right", marginTop = "10px", marginRight = "5px") {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.float = floatStyle;
  button.style.marginTop = marginTop;
  button.style.marginRight = marginRight;
  return button;
}

// ボタンを押したら所持CDをChromeストレージを更新する
function savePossessionCdList() {
  const links = document.querySelectorAll("#mypage_possession ul li a");
  const cdList = Array.from(links).map((link) => {
    const parts = link.getAttribute("href").split("/");
    // NOTE：「my/possession」と「mypage/possession/p4jyn」でindexが異なるので以下で吸収する
    return parts[parts.findIndex((part) => part === "cd") + 1];
  });

  chrome.storage.local.set({ [MY_POSSESSION_CD_LIST_KEY]: cdList }, () => {
    console.log(`${MY_POSSESSION_CD_LIST_KEY} を保存しました`, cdList);
    alert("所持CDリストを保存しました！");
  });
}
