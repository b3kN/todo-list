define([
  'knockout'
], function (ko) {

  var todo = {

    pageTitle: 'To Do',
    
    // Observables
    active: ko.observable(0), // Number of active items
    completed: ko.observable(0), // Number of completed items
    list: ko.observableArray([]), // Array containing items
    main: ko.observable(null), // Input field for new items
    showActive: ko.observable(false), // Action to show active items
    showAll: ko.observable(true), // Action to show all items
    showArchive: ko.observable(false), // Action to show archived items
    showComplete: ko.observable(false), // Action to show completed items

    // Check before loading route
    // Not required, just an example:
    before: function (fn) {
      console.log('Before TODO');
      fn(true); // ...or fn(false) to block access
    },
    
    // Any onload processes
    load: function () {
      console.log('Loaded TODO');
    },
    
    // Run when leaving page
    // Not required, just an example
    unload: function () {
      console.log('Unloaded TODO');
    },
    
    // Add item to list array & perform count on array items
    addItem: function () {
      if(this.main()){
        this.list.push({id: + new Date(), active: ko.observable(true), complete: ko.observable(false), edit: ko.observable(false), content: ko.observable(this.main()), archive: ko.observable(false)});
        this.main(null); // Reset main input observable for new item
        this.countActive();
        this.countComplete();
      }
      todo.storeItem();
    },
    
    storeItem: function () {
      var active = todo.list()[0].active();
      var complete = todo.list()[0].complete();
      var content = todo.list()[0].content();
      var archive = todo.list()[0].archive();
      var localObj = {content: content, active: active, complete: complete, archive: archive};
      localStorage.setItem('list', JSON.stringify(localObj));
    },
    
    // Archive item from list array & perform counts
    delItem: function (data) {
      data.archive(true); // Set item to archive
      data.active(false); // Remove active from item
      data.complete(false); // Remove complete from item
      todo.countActive();
      todo.countComplete();
    },
    
    // Edit content of item
    editItem: function (data) {
      if(!data.edit()){ // If not already set to edit
        if(!data.archive()){ // && if not set to archive
          if(!data.complete()){ // && finally not set to complete
            data.edit(true); // Set item to edit
            document.getElementById('editing').focus(); // focus on the input
          }
        }
      }
    },
    
    // Save out the new content of item
    saveItem: function (data) {
      data.edit(false); // Remove edit setting from item
    },
    
    // Set item to complete when finished & perform counts
    changeActive: function (data) {
      if(data.complete()) { // If set to complete
        data.complete(false); // Remove complete setting
        data.active(true); // Set to active
      }else{ // If not set to complete
        data.complete(true); // Set item to complete
        data.active(false); // Remove active setting
      }
      todo.countActive();
      todo.countComplete();
    },
    
    // Count number of active items
    countActive: function () {
      var x = 0; // constant
      for(var i = 0; i < this.list().length; i++){
        if(!this.list()[i].archive()){ // if item is not archived
          if(!this.list()[i].complete()){ // && if item is not completed
            x++; // Increment constant by 1
          }
        }
      }
      this.active(x); // Set number of active items to the new constant
    },
    
    // Count number of completed items
    countComplete: function () {
      var t = 0; // constant
      for(var i = 0; i < this.list().length; i++){
        if(!this.list()[i].archive()){ // if item is not archived
          if(this.list()[i].complete()){ // && if item IS completed
            t++; // Increment constant by 1
          }
        }
      }
      this.completed(t); // Set number of active items to the new constant
    },
    
    // Archive all completed items
    delComp: function () {
      for(var i = 0; i < this.list().length; i++) {
        if(this.list()[i].complete()){ // if item is completed
          this.list()[i].archive(true); // set item to archived
          this.list()[i].complete(false); // remove completed setting
        }
      }
      this.completed(0); // Reset completed count to 0
    },
    
    // Function to show all items
    showAlld: function () {
      this.showAll(true);
      this.showActive(false);
      this.showArchive(false);
      this.showComplete(false);
    },
    
    // Function to show only active items
    showActivated: function () {
      this.showAll(false);
      this.showActive(true);
      this.showArchive(false);
      this.showComplete(false);
    },
    
    // Function to show only archived items
    showArchived: function () {
      this.showAll(false);
      this.showActive(false);
      this.showArchive(true);
      this.showComplete(false);
    },
    
    // Function to show only completed items
    showCompleted: function () {
      this.showAll(false);
      this.showActive(false);
      this.showArchive(false);
      this.showComplete(true);
    },
    
    // Remove item from array entirely
    rmItem: function (data) {
      todo.list.remove(data);
    },
    
    // Restore archived items
    restoreItem: function (data) {
      data.active(true); // set item to active
      data.archive(false); // remove archive setting
      todo.countActive();
      todo.countComplete();
    }
    
  };

  return todo;

});