const MY_POSSESSION_CD_LIST_KEY = "my_possession_cd_list";

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    initializeSaveItem();
  }
});

function initializeSaveItem() {
  const h1Element = document.querySelector("#mypage_possession h1");
  if (!h1Element) return;

  const button = createButton("所持CDの更新");
  h1Element.insertAdjacentElement("afterend", button);
  button.addEventListener("click", savePossessionList);
}

function createButton(text = "button", floatStyle = "right", marginTop = "10px") {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.float = floatStyle;
  button.style.marginTop = marginTop;
  return button;
}

function savePossessionList() {
  const links = document.querySelectorAll("#mypage_possession ul li a");
  const cdList = Array.from(links).map((link) => {
    const parts = link.getAttribute("href").split("/");
    return parts[parts.length - 1];
  });

  chrome.storage.local.set({ [MY_POSSESSION_CD_LIST_KEY]: cdList }, () => {
    console.log(`${MY_POSSESSION_CD_LIST_KEY} が保存されました`, cdList);
  });
}
