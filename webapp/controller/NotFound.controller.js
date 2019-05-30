sap.ui.define([
		"com/getronics/hr/ZManageOvertime/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("com.getronics.hr.ZManageOvertime.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);