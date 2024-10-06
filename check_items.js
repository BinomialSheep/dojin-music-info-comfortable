const MY_POSSESSION_CD_LIST_KEY = "my_possession_cd_list";

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    initializeCheckItems();
  }
});

// 全てのCDに「所持」「未所持」情報を追加する
async function initializeCheckItems() {
  addHighlightStyle();

  const result = await chrome.storage.local.get(MY_POSSESSION_CD_LIST_KEY);
  const possessionCdList = result[MY_POSSESSION_CD_LIST_KEY] || [];
  const links = document.querySelectorAll("a");

  console.log(possessionCdList);

  links.forEach((link) => processLink(link, possessionCdList));
}

// 「未所持」用スタイルを追加する
function addHighlightStyle() {
  const style = document.createElement("style");
  style.innerHTML = ".highlight { color: red; } ";
  document.head.appendChild(style);
}

// 1つのCDに対して「所持」「未所持」テキストを追加する
function processLink(link, possessionCdList) {
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("/cd")) return;
  const parts = link.getAttribute("href").split("/");

  const cdId = parts[parts.findIndex((part) => part === "cd") + 1];

  const originalText = link.textContent;
  const nextText = possessionCdList.includes(cdId)
    ? `【所持】${originalText}`
    : `<span class='highlight'>【未所持】</span>${originalText}`;

  link.innerHTML = nextText;
}
