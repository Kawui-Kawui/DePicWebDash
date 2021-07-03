async function roles(guild, pushs) {
  const roles = guild.roles.cache;
  roles.map((role) => {
    if (role.editable) {
      pushs.push({ editable: role.editable, id: role.id, name: role.name });
    }
  });
}
module.exports.roles = roles;
