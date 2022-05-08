let rolesFind = require("../../public/js/roles");
const guild = require("../../util/models/guild_db");

const GET_BIENV = async(req, res) => {
    let id = req.params.id;
    let servidor = req.BotClient.guilds.cache.get(id);

    const canales = [];
    const roles = [];
    rolesFind.roles(req.BotClient.guilds.cache.get(id), roles);
    let index3 = roles.join("\n");

    let find = await guild.findOne({ id: id });
    let checked = {
        channel: null,
        rol: null,
        img: null,
        nickName: null,
        text: null,
    };

    const lepush = (q, c) => {
        if (c.type == "text") q.push({ name: c.name, id: c.id });
    };

    const channels = servidor.channels.cache;
    channels.map((ch) => {
        if (ch.permissionsFor(req.BotClient.user).has("VIEW_CHANNEL")) {
            canales.push({ id: ch.id, name: ch.name });
        }
    });

    if (!find) {
        checked === checked;
    } else {
        switch (true) {
            case true:
                {
                    try {
                        if (find.bienv.id) {
                            checked.channel = servidor.channels.cache.get(find.bienv.id).name;
                        } else {
                            chacked.channel = "Ninguno";
                        }
                    } catch (error) {
                        checked.channel = "Ninguno";
                    }
                }
            case true:
                {
                    try {
                        if (find.bienv.onlyOneRol) {
                            checked.rol = servidor.roles.cache.get(find.bienv.onlyOneRol).name;
                        } else {
                            checked.rol = "Ninguno";
                        }
                    } catch (error) {
                        checked.rol = "Ninguno";
                    }
                }
            case true:
                {
                    try {
                        if (find.bienv.img) {
                            checked.img = find.bienv.img;
                        } else {
                            checked.img = false;
                        }
                    } catch (error) {
                        checked.img = false;
                    }
                }
            case true:
                {
                    try {
                        if (find.bienv.apodo) {
                            checked.nickName = find.bienv.apodo;
                        } else {
                            checked.nickName = "";
                        }
                    } catch (error) {
                        checked.nickName = "";
                    }
                }
            case true:
                {
                    try {
                        if (find.bienv.text) {
                            checked.text = find.bienv.text;
                        } else {
                            checked.text = "";
                        }
                    } catch (error) {
                        checked.text = "";
                    }
                }
        }
    }

    res.render("../views/dash/serverDash/complements/bienv", {
        user: req.user,
        checked,
        canales,
        id,
        servidor,
        roles,
        layout: `dash`,
    });
};
module.exports = GET_BIENV;