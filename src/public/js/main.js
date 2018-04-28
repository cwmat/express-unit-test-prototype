// Update list
function updateList(id) {
  $.ajax({
    url: "./api/smellmap",
    success: function (data) {
      $(id).empty();
      for (var i = 0; i < data.length; i++) {
        var rowHtml = "<tr>" + "<td>" + data[i]._id + "</td>" + "<td>" + data[i].name + "</td>" + "<td>" + data[i].long + ', ' + data[i].lat + "</td>" + "<td>" + data[i].type + "</td>" + "<td>" + data[i].desc + "</td>" + "</tr>"
        console.log(rowHtml);
        $(id).append(rowHtml);
      }
    }
  });
}

// Update drop down
function updateDropDown(id) {
  $.ajax({
    url: "./api/smellmap",
    success: function (data) {
      $(id).empty();
      for (var i = 0; i < data.length; i++) {
        var dropDownHtml = "<option>" + data[i]._id + "</option>"
        console.log(dropDownHtml);
        $(id).append(dropDownHtml);
      }
    }
  });
}

// Update list view and drop downs for whole page
function updatePage() {
  updateList('#list-table');
  updateDropDown('#find-drop-down');
  updateDropDown('#update-drop-down');
  updateDropDown('#delete-drop-down');
}

// On DOM load
$(function () {
  // Update page
  updatePage();

  // Enable find button
  $('#find-button').click(function () {
    var selectedText = $('#find-drop-down :selected').text();
    console.log('Finding:', selectedText);
    // AJAX call to find
    $.ajax({
      url: "./api/smellmap/" + selectedText,
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          var findHtml = "<tbody id='find-table'><tr>" + "<td>" + data[i]._id + "</td>" + "<td>" + data[i].name + "</td>" + "<td>" + data[i].long + ', ' + data[i].lat + "</td>" + "<td>" + data[i].type + "</td>" + "<td>" + data[i].desc + "</td>" + "</tr></tbody>"
          console.log(findHtml);
          $('#find-table').replaceWith(findHtml);
        }
      }
    });
  });

  // Create
  $('#create-button').click(function () {
    $.post("./api/smellmap", {
      name: $('#create-name').val(),
      lon: $('#create-long').val(),
      lat: $('#create-lat').val(),
      type: $('#create-type :selected').text(),
      desc: $('#create-desc').text()
    }).done(function (result) {
      console.log("Created new entry: ", result);
      $('#create-result').replaceWith(JSON.stringify(result));
      updatePage();
    });
  });

  // Update
  // On selection, change forms value
  $('#update-drop-down').change(function () {
    var currentId = $('#update-drop-down :selected').text();
    // AJAX call to find
    $.ajax({
      url: "./api/smellmap/" + currentId,
      success: function (data) {
        found = data[0];
        $('#update-name').val(found.name);
        $('#update-long').val(found.long);
        $('#update-lat').val(found.lat);
        $('#update-type').val(found.type);
        $('#update-desc').text(found.desc);
        $('#update-desc').val(found.desc);
      }
    });
  });

  $('#update-button').click(function () {
    var currentId = $('#update-drop-down :selected').text();
    $.ajax({
      url: "./api/smellmap/" + currentId,
      type: "PUT",
      data: {
        name: $('#update-name').val(),
        lon: $('#update-long').val(),
        lat: $('#update-lat').val(),
        type: $('#update-type :selected').text(),
        desc: $('#update-desc').val()
      },
      success: function(result) {
        console.log("Updated existing entry: ", result);
        $('#update-result').replaceWith(JSON.stringify(result));
        updatePage();
      }
    })
  });

  // Delete
  // Enable delete button
  $('#delete-button').click(function () {
    var selectedText = $('#delete-drop-down :selected').text();
    console.log('Finding:', selectedText);
    // AJAX call to find
    $.ajax({
      type: "DELETE",
      url: "./api/smellmap/" + selectedText,
      success: function (result) {
        console.log("Deleted entry: ", result);
        $('#delete-result').replaceWith(JSON.stringify(result));
        updatePage();
      }
    });
  });
// End DOM load function
})