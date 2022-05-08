const warn1_db = require("../../util/models/warn1_db");

const POST_WARNC = async(req, res) => {
    let id = req.params.id;
    let server = req.BotClient.guilds.cache.get(id);
    let body = req.body;

    let warns = await warn1_db.findOne({ guildid: id });
    let checked = {
        banT: null,
        ban: false,
        kickT: null,
        kick: false,
        rolT: null,
        rolId: null,
        rol: false,
    };

    switch (true) {
        case !isNaN(Number(body.banT)):
            {
                if (!body.banT == "0") {
                    checked.banT = body.banT;
                }
            }
        case !isNaN(Number(body.kickT)):
            {
                if (!body.kickT == "0") {
                    checked.kickT = body.kickT;
                }
            }

        case !isNaN(Number(body.rolT)):
            {
                if (!body.rolT == "0") {
                    checked.rolT = body.rolT;
                }
            }
        case !isNaN(Number(body.rolId)):
            {
                if (server.roles.cache.get(body.rolId)) {
                    checked.rolId = body.rolId;
                } else {
                    checked.rolId = warns.roleid;
                }
            }
        case !body.ban:
            {
                if (!body.ban) {
                    checked.ban = false;
                } else {
                    checked.ban = true;
                }
            }
        case !body.kick:
            {
                if (!body.kick) {
                    checked.kick = false;
                } else {
                    checked.kick = true;
                }
            }
        case !body.rol:
            {
                if (!body.rol) {
                    checked.rol = false;
                } else {
                    checked.rol = true;
                }
            }
    }

    let sv = new warn1_db({
        guildid: id,
        guild: id,
        role: checked.rol,
        roletime: checked.rolT,
        roleid: checked.rolId,
        kick: checked.kick,
        kicktime: checked.kickT,
        ban: checked.ban,
        bantime: checked.banT,
    });

    warns
        ?
        await warn1_db.updateOne({ guildid: id }, {
            guild: id,
            role: checked.rol,
            roletime: checked.rolT,
            roleid: checked.rolId,
            kick: checked.kick,
            kicktime: checked.kickT,
            ban: checked.ban,
            bantime: checked.banT,
        }) :
        await sv.save();

    res.redirect(`/dash/${id}/warn`);
};

module.exports = POST_WARNC;