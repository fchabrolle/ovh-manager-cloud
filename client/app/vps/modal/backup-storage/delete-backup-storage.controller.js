class DeleteBackupStorageCtrl {
    constructor ($translate, $uibModalInstance, ControllerHelper, CloudMessage, access, serviceName, VpsService) {
        this.$translate = $translate;
        this.$uibModalInstance = $uibModalInstance;
        this.CloudMessage = CloudMessage;
        this.access = access;
        this.serviceName = serviceName;
        this.VpsService = VpsService;
        this.ControllerHelper = ControllerHelper;
    }

    cancel () {
        this.$uibModalInstance.dismiss();
    }

    confirm () {
        this.CloudMessage.flushChildMessage();
        this.delete = this.ControllerHelper.request.getHashLoader({
            loaderFunction: () => this.VpsService.deleteBackupStorageAccess(this.serviceName, this.access)
                .then(() => this.CloudMessage.success(this.$translate.instant("vps_backup_storage_access_delete_success", { ipBlock: this.access })))
                .catch(() => this.CloudMessage.error(this.$translate.instant("vps_backup_storage_access_delete_failure", { ipBlock: this.access })))
                .finally(() => this.$uibModalInstance.close())
        });
        this.delete.load();
    }
}

angular.module("managerApp").controller("DeleteBackupStorageCtrl", DeleteBackupStorageCtrl);
