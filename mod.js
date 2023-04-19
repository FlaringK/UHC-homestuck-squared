const toPageString = pageNumber => pageNumber < 10000 ? `00${pageNumber}` : `0${pageNumber}`

const hsPage = pageText => `
<div class="homestuckSqr"> <div class="pageBody customStyles theme-Denizenthemes-0"> <nav class="navBanner customNavBanner pixelated"> <div class="navList"> <a href="/">HOMESTUCK COLLECTION</a> <div class="candyCorn"></div><a href="/help">HELP</a> <div class="candyCorn"></div><a href="/map">MAP</a> <div class="sep">|</div><a href="/homestuck2-log">HS^2 LOG</a> <div class="sep">|</div><a href="/search">SEARCH</a> <div class="candyCorn"></div><a href="/news">NEWS</a> <div class="sep">|</div><a href="/music">MUSIC</a> <div class="candyCorn"></div><a href="/evenmore">MORE</a> <div class="sep">|</div><a href="/settings">SETTINGS</a> <div class="sep">|</div><a href="/credits">CREDITS</a> </div></nav> <div class="pageFrame"> <div class="pageContent"> <div class="story-text"> ${pageText}</div> </div></div><div class="footer " style="width: 950px;"><img src="assets://images/footer-heart-logo.png" alt="" draggable="false" class="bannerImage left"><img src="assets://images/footer-heart-logo.png" alt="" draggable="false" class="bannerImage right"></div></div></div>
`
const arrow = link => `<div class="arrow"> <div> <span>&gt;</span> <a href="${link}">==&gt; </a><br></div></div>`
const bottomLinks = link => `<div class="bottomLinks"> <a href="/homestuck2">Start Over</a> | <a href="${link}">Go Back</a> </div>`

let api
let customPages = []

module.exports = {
  title: "Homestuck^2",
  summary: "Homestuck^2. An official continuation of Homestuck.",
  author: "FlaringK (<a href='https://flaringk.github.io/'>Here's my uber cool site</a>)",
  version: 0.1,

  styles: [ { source: "./customPage.css" } ],

  // Add images to UHC
  trees: {
    './assets/': 'assets://images/'
  },

  computed(api_) {
    api = api_

    const hs2Data = api.readJson('./homestuckSqr.json')

    // First page
    let firstpage = `<h2>Somewhere, in the distant reaches of space...</h2><img src="assets://images/homestuckSqrPanels/0001.gif">`
    firstpage += `<div class="bodyText"></div>` + arrow(`homestuck2-2`) + `<div class="bottomLinks"> <a href="/homestuck2">Start Over</a></div>`

    firstpage = `
    <div class="homestuckSqr"> <div class="pageBody customStyles theme-Denizenthemes-0"> <nav class="navBanner customNavBanner pixelated"> <img src="assets://images/HS2_logo.png" style="max-width: 950px; margin: auto; display: block;"> <h3 style="color: #FFFFFF;line-height: 1.15;text-align: center;font-size: 18px;padding-top: 15px;padding-bottom: 15px;">An official continuation of <i>Homestuck.</i></h3> <div class="navList"> <a href="/">HOMESTUCK COLLECTION</a> <div class="candyCorn"></div><a href="/help">HELP</a> <div class="candyCorn"></div><a href="/map">MAP</a> <div class="sep">|</div><a href="/homestuck2-log">HS^2 LOG</a> <div class="sep">|</div><a href="/search">SEARCH</a> <div class="candyCorn"></div><a href="/news">NEWS</a> <div class="sep">|</div><a href="/music">MUSIC</a> <div class="candyCorn"></div><a href="/evenmore">MORE</a> <div class="sep">|</div><a href="/settings">SETTINGS</a> <div class="sep">|</div><a href="/credits">CREDITS</a> </div></nav> <div class="mar-y-rg" style="height:3px;width:100%;background-color:#f2a400;"></div> <div class="pageFrame"> <div class="pageContent"> <div class="story-text"> ${firstpage}</div> </div></div><div class="footer " style="width: 950px;"><img src="assets://images/footer-heart-logo.png" alt="" draggable="false" class="bannerImage left"><img src="assets://images/footer-heart-logo.png" alt="" draggable="false" class="bannerImage right"></div></div></div>
    `

    // Add first page
    customPages[`HOMESTUCK2`] = {
      component: {
        title: () => "Homestuck^2: Beyond Canon", // Title on tab
        next: () => `/homestuck2`, // URL (Doesn't really matter)
        template: firstpage // 
      },
      scss: ""
    }

    // Create pages
    for (let i = 2; i < hs2Data.pages.length + 1; i++) {
      const data = hs2Data.pages[i - 1];

      // Command
      let html = `<h2>${data.command}</h2>`

      // Images
      if (data.panelCount == 1) { html += `<img src="assets://images/homestuckSqrPanels/${i.toString().padStart(4, "0")}.gif">` }
      else {
        for (let j = 0; j < data.panelCount; j++) { 
          html += `<img src="assets://images/homestuckSqrPanels/${i.toString().padStart(4, "0")}_${j + 1}.gif">` 
        }
      }

      // Body
      html += `<div class="bodyText">${data.body}</div>`

      // Next arrow link
      if (i != hs2Data.pages.length) { html += arrow(`homestuck2-${i + 1}`) }

      // Bottom links
      if (i != 2) { html += bottomLinks(`homestuck2-${i - 1}`) }
      else { html += bottomLinks(`homestuck2`) }

      // Add page
      customPages[`HOMESTUCK2-${i}`] = {
        component: {
          title: () => "Homestuck^2: Beyond Canon", // Title on tab
          next: () => `/homestuck2-${i + 1}`, // URL (Doesn't really matter)
          template: hsPage(html) // 
        },
        scss: ""
      }
      
    }

    customPages[`HOMESTUCK2-LOG`] = {
      component: {
        title: () => "Homestuck^2: Beyond Canon", // Title on tab
        next: () => `/homestuck2-log`, // URL (Doesn't really matter)
        template: hsPage("<h2>ADVENTURE LOG</h2>" + hs2Data.log) // 
      },
      scss: ""
    }


    return {

      // Add new page to Home Menu
      edit(archive) {
        archive.tweaks.modHomeRowItems.push({
          href: "/homestuck2",
          thumbsrc: "assets://images/footer-heart-logo.png",
          title: "Homestuck^2: Beyond Canon",
          date: "Apr 2023",
          description: "Homestuck^2. An official continuation of Homestuck."
        });
      },

      browserPages: customPages,

    }
  },

}