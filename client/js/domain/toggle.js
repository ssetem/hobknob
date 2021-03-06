'use strict';

angular.module('featureToggleFrontend')

.factory('Toggle', function(etcdPathService, etcdApiService) {

  function Toggle(data){
    angular.extend(this, data);
    this.boolValue = this.value === "true";
    var parts = etcdPathService.explode(data.key);
    this.applicationName = parts[2];
    this.toggleName = parts[3];
    this.fullPath = etcdPathService.getFullKeyPath(data.key);
  }

  Toggle.create = function(data){
    return new Toggle(data);
  };

  Toggle.prototype = {

    loadAudit:function(){
      return etcdApiService.getToggleAudit(this.applicationName, this.toggleName)
        .success(this.setAudit.bind(this));
    },

    setAudit:function(response){
      //this.audit = response.node.nodes.map(Toggle.create);
    }

  };

  return Toggle;

});