sap.ui.define([
	"com/getronics/hr/ZManageOvertime/controller/BaseController",
	"sap/ui/core/routing/History"
], function(BaseController, History) {
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
			var oModel = this.getModel();
			
			this.getModel().submitChanges();
		},

        onSubmit: function() {
        	
        },

       onAttSel: function(oEvent) {
			var oValidatedComboBox = oEvent.getSource(),
				sSelectedKey = oValidatedComboBox.getSelectedKey(),
				sValue = oValidatedComboBox.getValue();
				var oModel = this.getModel();
				var path = this._oContext.sPath + "/ZzAttType";
		        oModel.setProperty( path, sSelectedKey);
       },

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		_onRouteMatched: function() {
			// register for metadata loaded events
			var oModel = this.getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		_onMetadataLoaded: function () {
			// create default properties
			var oProperties = {
				Zaction            : "SAVE"
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
        _onCreateSuccess: function(oRequest){
        	var sId = oRequest.Zdocnr;
        	this.getRouter().navTo("object", {objectId: sId},true );
        },
		/**
		 * Event handler for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack : function() {
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