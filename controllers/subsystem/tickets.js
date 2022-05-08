const POST_TICKETS = async(req, res) => {
    let id = req.params.id;
    let servidor = req.BotClient.guilds.cache.get(id);

    res.render("../views/dash/serverDash/complements/tickets", {
        user: req.user,
        layout: `dash`,
        servidor,
    });
};

module.exports = POST_TICKETS;