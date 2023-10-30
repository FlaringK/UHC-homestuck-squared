const toPageString = pageNumber => pageNumber < 10000 ? `00${pageNumber}` : `0${pageNumber}`

const hsPage = (pageText, theme) => `
<div class="homestuckSqr ${theme ? theme : ""}"> <div class="pageBody customStyles theme-Denizenthemes-0"> <nav class="navBanner customNavBanner pixelated"> <div class="navList"> <a href="/homestuck2">HOME</a><div class="sep">|</div><a href="/homestuck2-bonus">BONUS</a><div class="sep">|</div><a href="/homestuck2-log">LOG</a><div class="candyCorn"></div><a href="/homestuck2-about">ABOUT</a><div class="sep">|</div><a href="/homestuck2-recap">RECAP</a><div class="candyCorn"></div><a href="/homestuck2-credits">CREDITS</a><div class="sep">|</div><a href="/">BACK TO UHC</a> </div></nav> <div class="pageFrame"> <div class="pageContent"> <div class="story-text"> ${pageText}</div> </div></div><div class="footer " style="width: 950px;"><div class="bannerImage left"></div><div class="bannerImage right"></div></div></div></div>
`
const arrow = (link, title) => `<div class="arrow"> <div> <span>&gt;</span> <a href="${link}">${title} </a><br></div></div>` //==&gt;
const bottomLinks = link => `<div class="bottomLinks"> <a href="/homestuck2">Start Over</a> | <a href="${link}">Go Back</a> </div>`

let api
let customPages = []

module.exports = {
  title: "Homestuck^2 (testversion)",
  summary: "Homestuck^2. An official continuation of Homestuck.",
  author: "FlaringK (<a href='https://flaringk.github.io/'>Here's my uber cool site</a>)",
  version: 1.0,

  styles: [ { source: "./homestuck2.css" }, { source: "./homestuck2themes.css" } ],

  // Add images to UHC
  trees: {
    './assets/': 'assets://images/'
  },

  computed(api_) {
    api = api_

    // ================
    // == MAIN STORY ==
    // ================
    const hs2Data = api.readJson('./homestuckSqr.json')

    // First page / Home
    let firstpage = `<h2>Somewhere, in the distant reaches of space...</h2><img src="assets://images/homestuckSqrPanels/0001.gif">`
    firstpage += `<div class="bodyText"></div>` + arrow(`homestuck2-2`, `${hs2Data.pages[2].command}`) + `<div class="bottomLinks"> <a href="/homestuck2">Start Over</a></div>`

    firstpage = `
    <div class="homestuckSqr"> <div class="pageBody customStyles theme-Denizenthemes-0"> <nav class="navBanner customNavBanner pixelated"> <img src="assets://images/HS2_logo.png" style="max-width: 950px; margin: auto; display: block;"> <h3 style="color: #FFFFFF;line-height: 1.15;text-align: center;font-size: 18px;padding-top: 15px;padding-bottom: 15px;">An official continuation of <i>Homestuck.</i></h3> <div class="navList"> <a href="/homestuck2">HOME</a><div class="sep">|</div><a href="/homestuck2-bonus">BONUS</a><div class="sep">|</div><a href="/homestuck2-log">LOG</a><div class="candyCorn"></div><a href="/homestuck2-about">ABOUT</a><div class="sep">|</div><a href="/homestuck2-recap">RECAP</a><div class="candyCorn"></div><a href="/homestuck2-credits">CREDITS</a><div class="sep">|</div><a href="/">BACK TO UHC</a> </div></nav> <div class="mar-y-rg" style="height:3px;width:100%;background-color:#f2a400;"></div> <div class="pageFrame"> <div class="pageContent"> <div class="story-text"> ${firstpage}</div> </div></div><div class="footer " style="width: 950px;"><div class="bannerImage left"></div><div class="bannerImage right"></div></div></div></div>
    `
 
	let logPapa = [`<p>10/25/2019 - <a href=\"/homestuck2\">\"Somewhere, in the distant reaches of space...\"</a></p>`];
    
    // Add first page
    customPages[`HOMESTUCK2`] = {
      component: {
        title: () => "Homestuck^2: Beyond Canon", 
        next: () => `/homestuck2`, 
        template: firstpage // 
      },
      scss: ""
    }

    // Create pages
    for (let i = 2; i < hs2Data.pages.length + 1; i++) {
      const data = hs2Data.pages[i - 1];
	  const dataCommand = hs2Data.pages[i]

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
      if (i != hs2Data.pages.length) { html += arrow(`homestuck2-${i + 1}`, `${dataCommand.command}`) } 

      // Bottom links
      if (i != 2) { html += bottomLinks(`homestuck2-${i - 1}`) }
      else { html += bottomLinks(`homestuck2`) }

      // Add page
      customPages[`HOMESTUCK2-${i}`] = {
        component: {
          title: () => "Homestuck^2: " + data.command, 
          next: () => `/homestuck2-${i + 1}`, 
          template: hsPage(html, data.theme) // 
        },
        scss: ""
      }
      
	  
	  
		  logPapa.unshift(`<p>${data.date} - <a href=\"/homestuck2-${i}\">\"${data.command}\"</a></p>`)
	  
    }

	let logPageData = `<div class=\"log o_story-nav pad-y-lg mar-x-rg mar-x-lg--md weight-bold\" style=\"font-size:11px\">` + logPapa.join("") + `</div>`
    // Add log page
    customPages[`HOMESTUCK2-LOG`] = {
      component: {
        title: () => "Homestuck^2: Log", 
        next: () => `/homestuck2-log`, 
        template: hsPage("<h2>ADVENTURE LOG</h2>" + logPageData) // 
      },
      scss: ""
    }

    // Add Recap page
    customPages[`HOMESTUCK2-RECAP`] = {
      component: {
        title: () => "Homestuck^2: Recap", 
        next: () => `/homestuck2-recap`, 
        template: hsPage(hs2Data.recap) // 
      },
      scss: ""
    }

    // Add Credits page
    customPages[`HOMESTUCK2-CREDITS`] = {
      component: {
        title: () => "Homestuck^2: Credits", 
        next: () => `/homestuck2-credits`, 
        template: hsPage("<h2>CREDITS</h2>" + hs2Data.credits) // 
      },
      scss: ""
    }

    // Add about page
    customPages[`HOMESTUCK2-ABOUT`] = {
      component: {
        title: () => "Homestuck^2: ABOUT", 
        next: () => `/homestuck2-about`, 
        template: hsPage("<h2>ABOUT</h2>" + hs2Data.about) // 
      },
      scss: ""
    }

    // Bonus Log page
    customPages[`HOMESTUCK2-BONUS`] = {
      component: {
        title: () => "Homestuck^2: Bonus", 
        next: () => `/homestuck2-bonus`, 
        template: hsPage(hs2Data.bonuslog) // 
      },
      scss: ""
    }

    // ===========
    // == BONUS ==
    // ===========

    for (const [name, pages] of Object.entries(hs2Data.bonus)) {

      for (let i = 1; i < pages.length + 1; i++) {
        const page = pages[i - 1];

        // Command
        let html = `<h2>${page.command}</h2>`

        // Images
        if (page.panelCount == 1) { html += `<img src="assets://images/homestuckSqrBonus/${name}/${i.toString().padStart(4, "0")}.gif">` }
        else {
          for (let j = 0; j < page.panelCount; j++) { 
            html += `<img src="assets://images/homestuckSqrBonus/${name}/${i.toString().padStart(4, "0")}_${j + 1}.gif">` 
          }
        }

        // Body
        html += `<div class="bodyText">${page.body}</div>`

        // Next arrow link
        if (i != pages.length) { html += arrow(`homestuck2-${name}-${i + 1}`) }

        // Bottom links
        if (i != 1) html += `<div class="bottomLinks"> <a href="/homestuck2-${name}-1">Start Over</a> | <a href="homestuck2-${name}-${i - 1}">Go Back</a> </div>`

        // Cheat jazz multi
        if (page.theme == "jazz multi") {
          html = html.replace(`</div></div><div class="arrow">`, `<div class="arrow">`) + "</div></div>"
        }

        // Add page
        customPages[`HOMESTUCK2-${name.toUpperCase()}-${i}`] = {
          component: {
            title: () => "Homestuck^2: " + name.charAt(0).toUpperCase() + name.slice(1), 
            next: () => `/homestuck2-${name.toUpperCase()}-${i + 1}`, 
            template: hsPage(html, page.theme) // 
          },
          scss: ""
        }
        
      }

    }


    return {

      // Add new page to Home Menu
      edit(archive) {

        // Homestuck 2
        archive.tweaks.modHomeRowItems.push({
          href: "/homestuck2",
          thumbsrc: "assets://images/homestuck2Icon.png",
          title: "Homestuck^2: Beyond Canon",
          date: "Oct 2019 - Dec 2020",
          description: "An official continuation of Homestuck."
        });

      },

      browserPages: customPages,

    }
  },

}