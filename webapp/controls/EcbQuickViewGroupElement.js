jQuery.sap.declare("QuickViewExample.controls.EcbQuickViewGroupElement");
jQuery.sap.require("sap.m.QuickViewGroupElement");
jQuery.sap.require("sap.m.Image");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.QuickViewGroupElementType");
jQuery.sap.require("sap.ui.core.CustomData");
jQuery.sap.require("sap.m.MessageToast");

sap.m.QuickViewGroupElement.extend("QuickViewExample.controls.EcbQuickViewGroupElement", {

			metadata: {

				properties: {
					"linkIcon": {
						type: "string",
						group: "Misc",
						defaultValue: ""
					}
				}
			},
			
			handleImagePress: function(evt,url) {
				window.open(url,"_blank");
			},

			_getGroupElementValue: function(sQuickViewPageId) {
				if (!this.getValue()) {
					return null;
				}

				switch (this.getType()) {
					case sap.m.QuickViewGroupElementType.email:
						
						var href = "mailto:" + this.getValue();
						var subject = this.getEmailSubject();
						if (subject) {
							href += '?subject=' + subject;
						}

						return new sap.m.Link({
							href: href,
							text: this.getValue()
						});
					case sap.m.QuickViewGroupElementType.phone:
					case sap.m.QuickViewGroupElementType.mobile:
						return new sap.m.Link({
							href: "tel:" + this.getValue(),
							text: this.getValue()
						});
					case sap.m.QuickViewGroupElementType.link:
						var linkIcon = this.getLinkIcon();
						if (linkIcon) {
							var path = $.sap.getModulePath("QuickViewExample", "/res/lnkdin.png");
							//var oMap2 = new sap.ui.commons.ImageMap("Map2", {name:"Map2"}).placeAt("sample2");
							//oMap2.createArea({shape: "poly", alt: "A", href: "http://www.sap.com", coords: "15,30,23,7,30,7,38,30"});
							var that = this;
							var url = this.getUrl();
							return new sap.m.Image({
								src: path,
								width: "2em",
								press: function(oEvent){
							    	that.handleImagePress(oEvent,url);
							    },
								//useMap: new sap.ui.commons.ImageMap("Map2", {name:"Map2"}).createArea({shape: "poly", alt: "A", href: "http://www.sap.com", coords: "15,30,23,7,30,7,38,30"})
							});
						}
						else {
							return new sap.m.Link({
								href: this.getUrl(),
								text: this.getValue(),
								target: this.getTarget()
							});							
						}
					case sap.m.QuickViewGroupElementType.pageLink:

						var linkValue = this.getPageLinkId();
						if (sQuickViewPageId) {
							linkValue = sQuickViewPageId + '-' + linkValue;
						}

						return new sap.m.Link({
							href: "#",
							text: this.getValue(),
							customData: [new sap.ui.core.CustomData.CustomData({
								key: "pageNumber",
								value: linkValue
							})]
						});
					
					default:
						return new sap.m.Text({
							text: this.getValue()
						});
				}
			}
});