//Creating function to Get all data from Database from Ajax
function CallAjax() {
    $.ajax({
        async: true,
        type: "GET",
        url: "https://localhost:7297/api/Speciality",
        dataType: "json",
        success: function (json) {

            //Creating Parent Element in JStree
            var JstreeData = [{
                id: "SpecialityMaster",
                parent: "#",
                text: "Speciality Master",
                icon: "fa fa-folder text-success",
                state: {
                    opened: true
                },
            }];

            //For-loop for all data from Db
            $.each(json, function (key, value) {
                JstreeData.push(
                    {
                        id: value.doctorSpecialityCode, // required
                        parent: "SpecialityMaster", // required
                        text: value.doctorSpecailityName_local,  // node text
                        icon: "fa fa-file text-success", // string for custom
                        state: {
                            opened: true
                        },
                    }
                )
            })
            //Passing all data in JStree function
            JSTrees(JstreeData);
        }
    });
}

//Function to create Jstree
function JSTrees(jsonData) {
    $('#treeview').jstree(
        {
            'core': {
                'data': jsonData
            },
            "plugins": ["contextmenu", "search", "sort"],
            "contextmenu": {
                "items": function () {
                    var tree = $("#treeview").jstree(true);
                    return {
                        "view": {
                            "separator_before": false,
                            "separator_after": true,
                            "label": "view",
                            "icon": "fa fa-folder-open-o",
                            "action": function () {
                                //Getting the node data value
                                var node = $("#treeview").jstree('get_selected');

                                //Fetching all data from database via giving node data in url
                                $.getJSON(`https://localhost:7297/api/Speciality/${node}`, function (responseData) {

                                    //printing all data in specific field
                                    $('#SpecialityCode').val(responseData[0].doctorSpecialityCode);
                                    $("#levelNumber").data("kendoComboBox").value(responseData[0].levelNumber);
                                    $("#ParentName").data("kendoComboBox").value(responseData[0].parentName);
                                    $('#SpecialityName').val(responseData[0].doctorSpecailityName);
                                    $('#SpecialityNameLocal').val(responseData[0].doctorSpecailityName_local);
                                    $('#comment').val(responseData[0].remarks);

                                    //Changin behaviour of field in view section
                                    $("#levelNumber").data("kendoComboBox").enable(false);
                                    $("#ParentName").data("kendoComboBox").enable(false);
                                    $("#SpecialityCode").prop('disabled', true);
                                    $("#levelNumber").prop('disabled', true);
                                    $("#ParentName").prop('disabled', true);
                                    $("#SpecialityName").prop('disabled', true);
                                    $("#SpecialityNameLocal").prop('disabled', true);
                                    $("#comment").prop('disabled', true);

                                    //Changing background color for all disabled d
                                    $("#SpecialityCode").addClass("bg-white");
                                    $("#levelNumber").addClass("bg-white");
                                    $("#ParentName").addClass("bg-white");
                                    $("#SpecialityNameLocal").addClass("bg-white");
                                    $("#comment").addClass("bg-white");
                                    $("#SpecialityName").addClass("bg-white");
                                })
                            },
                        },
                        "Edit": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Edit",
                            "icon": "fa fa-pencil",
                            "action": function () {
                                $('#UpdateMode').remove();
                                //$('#treeview').jstree('get_selected', true)[0].text; - to get node name
                                $('#SaveMode').hide();
                                $('#UpdateBtn').append('<i class="fa fa-floppy-o text-success float-end me-3 p-1" style="font-size:25px;"aria-hidden="true" id="UpdateMode"></i>');
                                console.log("Edit function is working");
                                var node = $("#treeview").jstree('get_selected');
                                console.log(node);
                                $.getJSON(`https://localhost:7297/api/Speciality/${node}`, function (responseData) {
                                    console.log(responseData);
                                    $("#SpecialityCode").prop('disabled', true);
                                    $("#levelNumber").prop('disabled', false);
                                    $("#ParentName").prop('disabled', false);
                                    $("#SpecialityName").prop('disabled', false);
                                    $("#SpecialityNameLocal").prop('disabled', false);
                                    $("#comment").prop('disabled', false);
                                    $("#levelNumber").data("kendoComboBox").enable(true);
                                    $("#ParentName").data("kendoComboBox").enable(true);

                                    $("#SpecialityCode").addClass("bg-white");
                                    $('#SpecialityCode').val(responseData[0].doctorSpecialityCode);
                                    $("#levelNumber").data("kendoComboBox").value(responseData[0].levelNumber);
                                    $("#ParentName").data("kendoComboBox").value(responseData[0].parentName);
                                    $('#SpecialityName').val(responseData[0].doctorSpecailityName);
                                    $('#SpecialityNameLocal').val(responseData[0].doctorSpecailityName_local);
                                    $('#comment').val(responseData[0].remarks);

                                    //Update Validation
                                    $('#UpdateMode').click(function () {
                                        try {
                                            //Validation of Input Form 
                                            var levelNumber = $("#levelNumber").data("kendoComboBox").value();
                                            var parentName = $("#ParentName").data("kendoComboBox").value();
                                            var doctorSpecialityCode = $('#SpecialityCode').val();
                                            var doctorSpecailityName = $('#SpecialityName').val();
                                            var doctorSpecailityName_local = $('#SpecialityNameLocal').val();
                                            var Remarks = $('#comment').val();

                                            //Validating all input fields
                                            if (levelNumber == "") {
                                                console.log("Validation is working")
                                                Swal.fire(
                                                    'Empty Field?',
                                                    'Level number cannot be empty?',
                                                    'warning'
                                                )
                                            } else if (parentName == "") {
                                                Swal.fire(
                                                    'Empty Field?',
                                                    'Parent Name cannot be empty?',
                                                    'warning'
                                                )
                                            } else if (doctorSpecialityCode == "") {
                                                Swal.fire(
                                                    'Empty Field?',
                                                    'Speciality Code cannot be empty?',
                                                    'warning'
                                                )
                                            } else if (doctorSpecailityName == "") {
                                                Swal.fire(
                                                    'Empty Field?',
                                                    'Speciality Name cannot be empty?',
                                                    'warning'
                                                )
                                            } else if (doctorSpecailityName_local == "") {
                                                Swal.fire(
                                                    'Empty Field?',
                                                    'Speciality local Name cannot be empty?',
                                                    'warning'
                                                )
                                            } else if (Remarks == "") {
                                                Swal.fire(
                                                    'Empty Field?',
                                                    'Remarks cannot be empty?',
                                                    'warning'
                                                )
                                            } else {
                                                //After validating all fields
                                                Swal.fire({
                                                    title: 'Are you sure you want to Update?',
                                                    text: "You won't be able to revert this!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Yes, Submit It!'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        var SpecialityViewModalData =
                                                        {
                                                            "levelNumber": levelNumber,
                                                            "parentName": parentName,
                                                            "doctorSpecialityCode": doctorSpecialityCode,
                                                            "doctorSpecailityName": doctorSpecailityName,
                                                            "doctorSpecailityName_local": doctorSpecailityName_local,
                                                            "remarks": Remarks
                                                        }
                                                        //Performing Code to Save Data in SQL
                                                        $.ajax({
                                                            type: "PUT",
                                                            url: "https://localhost:7297/api/Speciality",
                                                            contentType: "application/json; charset=utf-8",
                                                            data: JSON.stringify(SpecialityViewModalData),

                                                            success: function () {
                                                                swal.fire("Application Completed Successfully", "Information Inserted Transaction Completed", "success");
                                                                $('#UpdateMode').hide();
                                                                $('#SaveMode').show();

                                                                //Clearing all the Field
                                                                $('#SpecialityCode').val("");
                                                                $("#levelNumber").data("kendoComboBox").value("");
                                                                $("#ParentName").data("kendoComboBox").value("");
                                                                $('#SpecialityName').val("");
                                                                $('#SpecialityNameLocal').val("");
                                                                $('#comment').val("");
                                                                $("#treeview").jstree("destroy");
                                                                CallAjax();
                                                            }
                                                        })
                                                    }
                                                });

                                            }
                                        }
                                        catch (Ex) {
                                            console.log("Error in Save Mode" + Ex);
                                        }
                                    });
                                });
                            }
                        },
                        "Delete": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Delete",
                            "icon": "fa fa-trash",
                            "action": function (obj) {
                                console.log("delete function is working");
                                var node = $("#treeview").jstree('get_selected');
                                console.log(node);
                                Swal.fire({
                                    title: 'Are you sure?',
                                    text: "You won't be able to Delete this!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, delete it!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        $.ajax({
                                            url: `https://localhost:7297/api/Speciality?DoctorSpecialityCode=${node}`,
                                            datatype: "json",
                                            type: "DELETE",
                                            success: function () {
                                                Swal.fire(
                                                    'Deleted!',
                                                    'Your file has been deleted.',
                                                    'success'
                                                )
                                                $("#treeview").jstree("destroy");
                                                CallAjax();
                                            }
                                        });
                                    }
                                })
                            }
                        }
                    };
                },
            },
            'search': {
                'case_sensitive': false,
                'show_only_matches': true,
            },
        }
    )
}

//Document Ready function
$(document).ready(function () {
    try {
        //Kendo Combo-Box for levelNumber
        $("#levelNumber").kendoComboBox({
            //index: 0,
            dataTextField: "text",
            dataValueField: "text",
            borderRaidus: "small",
            fillMode: "flat",
            size: "medium",
            dataSource: [
                { text: "First Level", value: "1" },
                { text: "Second Level", value: "2" },
                { text: "Third Level", value: "3" },
                { text: "Fourth Level", value: "4" }
            ]
        });

        //Kendo Combo-Box for Parent name
        $("#ParentName").kendoComboBox({
            //index: 0,
            dataTextField: "text",
            dataValueField: "text",
            borderRaidus: "small",
            fillMode: "flat",
            size: "medium",
            placeholder: "Speciality",
            dataSource: [
                { text: "physiotherapy", value: "1" },
                { text: "Anesthesiologists", value: "2" },
                { text: "Cardiologists", value: "3" },
                { text: "Colon and Rectal Surgeons", value: "4" },
                { text: "Critical Care Medicine Specialists", value: "5" },
                { text: "Emergency Medicine Specialists", value: "6" },
                { text: "Family Physicians", value: "7" },
            ]
        });

        // //Adding Buttom  yes function
        $('#YesBtn').click(function () {
            $(this).removeClass("btn btn-secondary");
            $(this).addClass("btn btn-primary");
            $('#NoBtn').removeClass("btn btn-primary");
            $('#NoBtn').addClass("btn btn-secondary");
        });

        // Adding Buttom No function
        $('#NoBtn').click(function () {
            $(this).removeClass("btn btn-secondary");
            $(this).addClass("btn btn-primary");
            $('#YesBtn').removeClass("btn btn-primary");
            $('#YesBtn').addClass("btn btn-secondary");
        });
    }
    catch (Ex) {
        console.log("Kendo Combo box Error" + Ex);
    }

    //Creating SpecialityViewModal kendo object
    var SpecialityViewModal = kendo.observable(
        {
            levelnumber: "",
            ParentName: "",
            SpecialityCode: "",
            SpecialityName: "",
            NameLocal: "",
            Remarks: "",
        }
    );

    //Binding data with HTML tags
    kendo.bind($('#SpecialityValue'), SpecialityViewModal);

    CallAjax();

    $('#RefreshTree').click(function () {
        console.log("Working Refresh")
        $("#treeview").jstree("destroy");
        CallAjax();
    })

    $('#SaveMode').click(function () {
        try {
            //Validation of Input Form 
            var levelNumber = $("#levelNumber").data("kendoComboBox").value();
            var parentName = $("#ParentName").data("kendoComboBox").value();
            var doctorSpecialityCode = $('#SpecialityCode').val();
            var doctorSpecailityName = $('#SpecialityName').val();
            var doctorSpecailityName_local = $('#SpecialityNameLocal').val();
            var Remarks = $('#comment').val();

            //Validating all input fields
            if (levelNumber == "") {
                console.log("Validation is working")
                Swal.fire(
                    'Empty Field?',
                    'Level number cannot be empty?',
                    'warning'
                )
            } else if (parentName == "") {
                Swal.fire(
                    'Empty Field?',
                    'Parent Name cannot be empty?',
                    'warning'
                )
            } else if (doctorSpecialityCode == "") {
                Swal.fire(
                    'Empty Field?',
                    'Speciality Code cannot be empty?',
                    'warning'
                )
            } else if (doctorSpecailityName == "") {
                Swal.fire(
                    'Empty Field?',
                    'Speciality Name cannot be empty?',
                    'warning'
                )
            } else if (doctorSpecailityName_local == "") {
                Swal.fire(
                    'Empty Field?',
                    'Speciality local Name cannot be empty?',
                    'warning'
                )
            } else if (Remarks == "") {
                Swal.fire(
                    'Empty Field?',
                    'Remarks cannot be empty?',
                    'warning'
                )
            } else {
                //After validating all fields
                Swal.fire({
                    title: 'Are you sure you want to submit?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Submit It!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        SpecialityViewModalData =
                        {
                            "levelNumber": SpecialityViewModal.levelnumber,
                            "parentName": SpecialityViewModal.ParentName,
                            "doctorSpecialityCode": SpecialityViewModal.SpecialityCode,
                            "doctorSpecailityName": SpecialityViewModal.SpecialityName,
                            "doctorSpecailityName_local": SpecialityViewModal.NameLocal,
                            "remarks": SpecialityViewModal.Remarks
                        }

                        console.log(SpecialityViewModalData);
                        //Performing Code to Save Data in SQL
                        $.ajax({
                            type: "POST",
                            url: "https://localhost:7297/api/Speciality",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(SpecialityViewModalData),
                            success: function () {
                                swal.fire("Application Completed Successfully", "Information Inserted Transaction Completed", "success");
                                $("#treeview").jstree("destroy");
                                CallAjax();
                            }
                        });

                        //Clearing Previous Data
                        SpecialityViewModal.levelnumber = " ";
                        SpecialityViewModal.ParentName = "";
                        SpecialityViewModal.SpecialityCode = "";
                        SpecialityViewModal.SpecialityName = "";
                        SpecialityViewModal.NameLocal = "";
                        SpecialityViewModal.Remarks = "";

                        //Clearing all the Field
                        $('#SpecialityCode').val("");
                        $("#levelNumber").data("kendoComboBox").value("");
                        $("#ParentName").data("kendoComboBox").value("");
                        $('#SpecialityName').val("");
                        $('#SpecialityNameLocal').val("");
                        $('#comment').val("");
                    }
                });

            }

        }
        catch (Ex) {
            console.log("Error in Save Mode" + Ex);
        }
    });

    //Search in JStree
    $("#SearchJStree").keyup(function () {
        var searchString = $(this).val();
        $('#treeview').jstree('search', searchString);
    });

});
