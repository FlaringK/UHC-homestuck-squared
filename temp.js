let page = {
  panelCount: document.querySelectorAll("#content_container img").length,
  command: document.querySelector("#content_container h2").innerText,
  body: document.querySelector(".o-story_text") ? document.querySelector(".o-story_text").innerHTML.replaceAll("\n", "") : ""
}

let data = JSON.parse(localStorage.getItem("hs2data"))
data.push(page)
localStorage.setItem("hs2data", JSON.stringify(data))

console.log(data)