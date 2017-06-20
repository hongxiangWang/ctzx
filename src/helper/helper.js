function resolveDialogNest(id,_this) {
  let modalZ = _this.$jquery('.v-modal').css('z-index');
  let modalCell = _this.$jquery("#searchInfo #"+id+"").css('z-index');
  _this.$jquery('.v-modal').css('z-index',modalCell);
  _this.$jquery("#searchInfo #"+id+"").css('z-index',modalZ);
  //console.log(modalZ,modalCell)
}
function getAccount() {
    let store = require('store');
    let account = store.get('account');
    return account;
}
module.exports.resolveDialogNest = resolveDialogNest;
