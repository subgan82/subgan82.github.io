//"myproject.accordian"
dojo.provide("myProject.Accordion");
dojo.require("dijit._WidgetBase");
dojo.require("dojo.on");
dojo.declare("myProject.Accordion", [dijit._WidgetBase], {
  constructor: function(params, srcNodeRef) {},

  buildRendering: function(){
    // create the DOM for this widget
    this.domNode = dojo.create("div", {"class": "accordionContainer"});       
  },
  
  addPanel: function(panel) {
      if (!panel) {
          return;
      }
      //creating accordion panels
      var panelNode = dojo.create("div", {"class": "accordionPanel"}, this.domNode), 
          titleNode = dojo.create("div", {
            "class": "accordionPanelTitleNode",
            "data-selected": false
          }, panelNode),
          labelNode = dojo.create("label", {
            innerHTML: panel.title,
            "class": "accordionPanelTitle"
          }, titleNode),
          contentNode = dojo.create("div", {
            innerHTML: panel.content,
            "class": "accordionHidePanel"
          }, panelNode);
    //listen for click on the title panel
    dojo.on(titleNode, "click", dojo.hitch(this, this._handleTitleNodeClick, contentNode));
    
  },
  
  _handleTitleNodeClick: function(contentNode, e) {
    //hide other open panel which are open
    // only one panel open at a time
    dojo.query(".accordionShowPanel", this._rootDiv).forEach(function(node) {
      if(node !== contentNode) {
        dojo.toggleClass(node, "accordionShowPanel");
      }
    });
    //if this current panel is hidden show it , vice-versa
    dojo.toggleClass(contentNode, "accordionShowPanel");
  }
  
  
});


