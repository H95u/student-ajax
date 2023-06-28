function addNewClasses() {
    //lay du lieu
    let name = $('#name').val();

    let newClasses = {
        name: name
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newClasses),
        //tên API
        url: "http://localhost:8080/api/classes",
        //xử lý khi thành công
        success: showAll

    });
}


function getClasses(aClasses) {
    return `<tr><td>${aClasses.name}</td>
<td><button class="btn btn-danger" onclick="deleteClass(${aClasses.id})">Delete</button></td>
<td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#myUpdateModal" 
onclick="showUpdate(${aClasses.id})">Update</button></td>
</tr>`
}

function showAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/classes",
        success: function (data) {
            let content = '<table border="1" style="margin: auto;width: 700px;text-align: center"><tr><td>Name</td>' +
                '<td colspan="2">Action</td></tr>';
            for (let i = 0; i < data.length; i++) {
                content += getClasses(data[i]);
            }
            content += `</table>`
            document.getElementById("classesList").innerHTML = content;
        }
    });
}

function deleteClass(id) {
    if (confirm("Sure ?")) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/api/classes/" + id,
            success: showAll
        });
    }
}

let updateId;

function showUpdate(id) {
    updateId = id;
    $.ajax({
        url: 'http://localhost:8080/api/classes/' + id,
        type: 'GET',
        success: function (response) {
            document.getElementById("nameUpdate").value = response.name;
        }
    });
}

function updateClass() {
    let nameUpdate = document.getElementById("nameUpdate").value;

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: 'http://localhost:8080/api/classes/' + updateId,
        type: 'PUT',
        data: JSON.stringify({name: nameUpdate}),

        success: showAll
    })
    $('#myUpdateModal').modal('hide');
}






