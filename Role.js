
// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();
//
exports.roles = (function() {
ac.grant("Jobseeker")
 .readOwn("profile")
 .updateOwn("profile")

ac.grant("Recuiter")
 .extend("Jobseeker")
 .readAny("profile")

ac.grant("admin")
 .extend("Jobseeker")
 .extend("Recuiter")
 .updateAny("profile")
 .deleteAny("profile")

return ac;
})();
