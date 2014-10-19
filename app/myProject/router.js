  dojo.require("myProject.Accordion");
  dojo.require("dojo.hash"); // for back/forward button support 
  dojo.require("dojo.topic");
  dojo.require("dojo.on");

  dojo.addOnLoad(function() {
    var containerNode = dojo.byId("root"), // where the content will be inserted
        prefix= "!", // prefix for page hash, using #! makes site crawlable
        lastPage = (/([^\/]+).html$/.exec(location.pathname) ||[])[1] || "index",
        accordion;
    
    function loadPage(page) {
      // based on page we can get the content using AJAX from server
      // set the content in the contentNode
      if(lastPage === page && accordion) {
        return;
      }
      lastPage = page;
      dojo.hash(prefix + page);
      if(accordion) {
        dojo.forEach(dijit.findWidgets(containerNode), function(w) {
          w.destroyRecursive(true);
        });
        accordion = null;
      }
      if(page === "index") {
        accordion = new myProject.Accordion({style:"width: 300px"}, "containerDiv");
        accordion.addPanel({
          title: "section1",
          content: "<p>content 1</p>"
        });
        accordion.addPanel({
          title: "section2",
          content: "<p>content 2</p>"
        });
        accordion.addPanel({
          title: "section2",
          content: "<p>content 3</p>"
        });
        accordion.addPanel({
          title: "section3",
          content: "<p>content 4</p>"
        });
        accordion.startup();  
      }
      else if(page === "topics") {
        accordion = new myProject.Accordion({
            style: "width: 500px"
        }, "containerDiv");
        accordion.addPanel({
            title: "Education",
            content: "<p>content 1</p>"
        });
        accordion.addPanel({
            title: "Sports",
            content: "<p>content 2</p>"
        });
        accordion.addPanel({
            title: "Arts",
            content: "<p>content 3</p>"
        });
        accordion.addPanel({
            title: "Movies",
            content: "<p>content 4</p>"
        });
        accordion.startup();
      }
    } 
    
    dojo.on(dojo.byId("menu"), "a:click", function(event) {
        event.preventDefault();
        var page = dojo.attr(this, "href").replace(".html", "");
        loadPage(page);
    });
   

    dojo.topic.subscribe("/dojo/hashchange", function(newHash) {
      loadPage(newHash.substr(prefix.length));// parse the plain hash value without prefix
    });
    dojo.hash(prefix + (location.hash || lastPage), true);// set the default page hash

});