const guild = require("../../util/models/guild_db");

const POST_WARNC = async(req, res) => {
    let id = req.params.id;
    let server = req.BotClient.guilds.cache.get(id);
    let body = req.body;

    console.log(body);

    let find = await guild.findOne({ id: id });

    if (!find) {
        let sv = new guild({
            id: id,
        });
        await sv.save();
    }

    let checked = {
        channel: null,
        rol: null,
        img: null,
        nickName: null,
        text: null,
    };
    switch (req.params.type) {
        case "nickname":
            {
                if (body.nickname.length <= 15) {
                    checked.nickName = body.nickname;
                } else {
                    checked.nickName = find.bienv.apodo;
                }
                find.updateOne({ id: id }, { $set: { "bienv.apodo": checked.nickName } });
            }
        case "img":
            {
                let test = /(^https).*(png+$|jpg+$|jpeg+$)/g.exec(body.img);
                if (!test) {
                    checked.img = find.bienv.img;
                } else {
                    checked.img = test[0];
                }
                find.updateOne({ id: id }, { $set: { "bienv.img": checked.img } });
            }
        case "rol":
            {
                if (server.roles.cache.get(body.rolId)) {
                    checked.rol = body.rolId;
                } else {
                    checked.rol = find.bienv.onlyOneRol;
                }
                find.updateOne({ id: id }, { $set: { "bienv.onlyOneRol": checked.rol } });
            }
        case "channel":
            {
                if (server.roles.cache.get(body.channelid)) {
                    checked.channel = body.channelid;
                } else {
                    checked.channel = find.bienv.id;
                }
                find.updateOne({ id: id }, { $set: { "bienv.id": checked.channel } });
            }
    }

    res.redirect(`/dash/${id}/bienv`);
};

module.exports = POST_WARNC;