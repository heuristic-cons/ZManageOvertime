sap.ui.define([
	"com/getronics/hr/ZManageOvertime/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessagePopover",
	"sap/m/MessageItem",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(BaseController, History, MessagePopover, MessageItem, MessageToast) {
	"use strict";

	return BaseController.extend("com.getronics.hr.ZManageOvertime.controller.Add", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the add controller is instantiated.
		 * @public
		 */
		onInit: function() {
			// Register to the add route matched
			this.getRouter().getRoute("add").attachPatternMatched(this._onRouteMatched, this);
			// this.getView().byId("page").bindElement("/OT_request('4')");
			this._oMessageTemplate = new MessageItem({
				type: "{type}",
				title: "{title}",
				activeTitle: "{active}",
				description: "{description}",
				subtitle: "{subtitle}",
				counter: "{counter}"
			});			
			this._oMessagePopover = new MessagePopover({
				items: {
					path: "/",
					template: this._oMessageTemplate
				},
				activeTitlePress: function() {
					
				}
			});			
		},
		/**
		 * Event handler for the cancel action
		 * @public
		 */
		onCancel: function() {
			this.onNavBack();
		},
		/**
		 * Event handler for the save action
		 * @public
		 */
		onSave: function() {
			var sValue = "";
			var oModel = this.getView().getModel();
			var path = this._oContext.sPath + "/ZaatypeText";
			oModel.setProperty(path, sValue);
			this.getModel().submitChanges();
		},

		onSubmit: function() {
           var oModel = this.getView().getModel();
           var path = this._oContext.sPath + "/Zdocnr";
           var zdocnr = oModel.getProperty(path);
           oModel.callFunction("SubmitRequest", // function import name
                                             "POST", // http method
                              {"Zdocnr" : zdocnr  }, // function import parameters
                                               null,        
                               function(oData, response) { }, // callback function for success
                               function(oError){} ); // callback function for error           
		},

		onAttSel: function(oEvent) {
			var oValidatedComboBox = oEvent.getSource(),
				sSelectedKey = oValidatedComboBox.getSelectedKey(),
				sValue = oValidatedComboBox.getValue();
			var oModel = this.getView().getModel();
			var path = this._oContext.sPath + "/ZzAttType";
			oModel.setProperty(path, sSelectedKey);
			path = "/OT_typesSet('" + sSelectedKey + "')/OtHelp";

			sValue = oModel.getProperty(path);
			path = this._oContext.sPath + "/ZaatypeText";
			oModel.setProperty(path, sValue);
		},
		customFooterContent: function(oEvent) {

		},
		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		_onRouteMatched: function() {
			// register for metadata loaded events
			var oModel = this.getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		_onMetadataLoaded: function() {
			// create default properties
			var oProperties = {
				Zaction: "SAVE"
			};
			// create new entry in the model
			var oModel = this.getModel();
			this._oContext = oModel.createEntry("/OT_requestSet", {
				properties: oProperties,
				success: this._onCreateSuccess.bind(this)
			});

			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
		},
		_onCreateSuccess: function(oRequest) {
			var sId = oRequest.Zdocnr;
			if (sId !== "0000000000") {
				this.getRouter().navTo("object", {
					objectId: sId
				}, true);
			} 
		},
		onhandleMessage: function(oEvent) {
			var oModel = this.getView().getModel();
			var path = this._oContext.sPath + "/Error1";
			var error = oModel.getProperty(path);

			this.count = 0;

			if (error !== "") {
				this.count = this.count + 1;
				var oMessage = [{
					type: "Error",
					title: "Error message",
					active: true,
					description: error,
					subtitle: "",
					counter: this.count
				}];
			}
			path = this._oContext.sPath + "/Error2";
			error = oModel.getProperty(path);
			this.addMessage(error, oMessage);
			path = this._oContext.sPath + "/Error3";
			error = oModel.getProperty(path);
			this.addMessage(error, oMessage);			
			path = this._oContext.sPath + "/Error4";
			error = oModel.getProperty(path);
			this.addMessage(error, oMessage);			
	
			
			var oMsgModel = new sap.ui.model.json.JSONModel();
			oMsgModel.setData(oMessage);

			this._oMessagePopover.setModel(oMsgModel);
			this._oMessagePopover.toggle(oEvent.getSource());
		},
		addMessage: function(msg, oMessage) {
			if (msg !== "") {
				this.count = this.count + 1;
				 oMessage.push(
				 {
					type: "Error",
					title: "Error message",
					active: true,
					description: msg,
					subtitle: "",
					counter: this.count
				});
			}					  	
		},
		/**
		 * Event handler for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack: function() {
			// discard new product from model.
			this.getModel().deleteCreatedEntry(this._oContext);

			var oHistory = History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("worklist", {}, bReplace);
			}
		}

	});
});