/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"com/getronics/hr/ZManageOvertime/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/getronics/hr/ZManageOvertime/test/integration/pages/Worklist",
	"com/getronics/hr/ZManageOvertime/test/integration/pages/Object",
	"com/getronics/hr/ZManageOvertime/test/integration/pages/NotFound",
	"com/getronics/hr/ZManageOvertime/test/integration/pages/Browser",
	"com/getronics/hr/ZManageOvertime/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.getronics.hr.ZManageOvertime.view."
	});

	sap.ui.require([
		"com/getronics/hr/ZManageOvertime/test/integration/WorklistJourney",
		"com/getronics/hr/ZManageOvertime/test/integration/ObjectJourney",
		"com/getronics/hr/ZManageOvertime/test/integration/NavigationJourney",
		"com/getronics/hr/ZManageOvertime/test/integration/NotFoundJourney",
		"com/getronics/hr/ZManageOvertime/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});