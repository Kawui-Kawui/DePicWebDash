const { Router } = require("express");
const router = Router();
const { auth } = require("../../util/middleware/auth");
const fs = require("fs")
const info = require("../../controllers/plugins/PL.js")

function plugins() {
  let content = []
  let directory = fs.readdirSync("./public/resources/plugins").filter(e => e = e.endsWith(".dll"))
  let directoryDirs = fs.readdirSync("./public/resources/plugins").filter(e => e = !e.endsWith(".dll"))
  for (let i = 0; i < directory.length; i++) {
    let file = directory[i].replace(".dll", "");
    let infile = fs.readdirSync("./public/resources/plugins/" + directoryDirs[i])
    let lang = []
    try {
      for (let a = 0; a < infile.length; a++) {
        const regex = /([A-Za-z0-9_]+)\.([a-zA-Z]+)\.[A-Za-z0-9]+\.xml/gm;

        let isLANG = regex.exec(infile[a])
        if (isLANG) {
          let titles = {
            en: {
              desc: "Description",
              config: "Configuration",
              translates: "Translation"
            },
            es: {
              desc: "Descripcion",
              config: "Configuracion",
              translates: "Traduccion"
            },
          }
          lang.push({
            id: isLANG[2],
            titles: titles[isLANG[2]],
            desc: "No have",
            translates: `./public/resources/plugins/${isLANG[1]}/${isLANG[0]}`,
            config: `./public/resources/plugins/${isLANG[1]}/${isLANG[1]}.configuration.xml`
          })
        }

      }
    } catch (error) { }
    content.push({
      name: file,
      version: "?.?.??",
      license: "????",
      license_url: "http://www.wtfpl.net/about/",
      code: "yes",
      lenguages: lang,
      file: `/resources/plugins/${directory[i]}`,
      img: null,
    })
  }
  return content
  
}

router.get("/", (req, res) => {
  let ids = plugins()
  for (let i = 0; i < ids.length; i++) {
     Object.assign(ids[i], { id: i })
  }
  for (let i = 0; i < info.length; i++) {
    if (info[i].name === "Plugins") {
        info[i].plugin = ids
    }
    
  }
  res.render("../views/plugins/main", {
    user: req.user,
    esta: true,
    info: info
  });
});

router.use("/:id", async (req, res) => {
  let plugin = plugins()[req.params.id]
  try {
    for (let index = 0; index < plugin.lenguages.length; index++) {
      plugin.lenguages[index].name = plugin.name
      plugin.lenguages[index].translates_file = plugin.lenguages[index].translates.replace(".", "").replace("public", "").replace("/", "")
      plugin.lenguages[index].config_file = plugin.lenguages[index].config.replace(".", "").replace("public", "").replace("/", "")
      let config = fs.readFileSync(plugin.lenguages[index].config, "utf8")
      plugin.lenguages[index].config = config//replaceCharacters(config)
      let translates = fs.readFileSync(plugin.lenguages[index].translates, "utf8")
      plugin.lenguages[index].translates = translates
    }
  } catch (error) { 
    console.error(error)
  }
  res.render("../views/plugins/plugin", {
    user: req.user,
    esta: true,
    plugin: plugin,
  })
});
module.exports = router;
