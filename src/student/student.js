function getStudent(student) {
    return `<tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.point}</td>
        <td>${student.age}</td>
        <td>${student.classes.name}</td>
        <td><button class="btn btn-danger" onclick="deleteStudent(${student.id})">Delete</button></td>
        <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#myUpdateStudentModal" onclick="getAllSelectClass();showUpdate(${student.id})">Update</button></td>`
}

function showAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students",
        success: function (data) {
            let content = `<table border="1" style="margin: auto;width: 700px;text-align: center"><tr> +
                <td>Id</td>
                <td>Name</td> 
                <td>Point</td> 
                <td>Age</td> 
                <td>Class</td> 
                <td colspan="2">Action</td></tr>`;
            for (let i = 0; i < data.length; i++) {
                content += getStudent(data[i]);
            }
            content += `</table>`
            document.getElementById("studentList").innerHTML = content;
        }
    });
}

function addNewStudent() {
    //lay du lieu
    let name = $('#name').val();
    let point = $('#point').val();
    let age = $('#age').val();
    let classId = $('#classId').val();
    console.log(classId)
    let newStudent = {
        name: name,
        point: point,
        age: age,
        classes: {
            id: classId
        }
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newStudent),
        //tên API
        url: "http://localhost:8080/api/students",
        //xử lý khi thành công
        success: showAll

    });
    $('#myCreateStudentModal').modal('hide');
}

function getClassOption(aClass) {
    return `<option value="${aClass.id}">${aClass.name}</option>`
}

function getAllSelectClass() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/classes",
        success: function (data) {
            let content = `<select id="classId">`
            for (let i = 0; i < data.length; i++) {
                content += getClassOption(data[i]);
            }
            content += `</select>`;
            document.getElementById("selectClass").innerHTML = content;
            document.getElementById("selectClassUpdate").innerHTML = content;
        }
    });

}


function deleteStudent(id) {
    if (confirm("Sure ?")) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/api/students/" + id,
            success: showAll
        });
    }
}

let updateId;

function showUpdate(id) {
    updateId = id;
    $.ajax({
        url: 'http://localhost:8080/api/students/' + id,
        type: 'GET',
        success: function (response) {
            document.getElementById("nameUpdate").value = response.name;
            document.getElementById("pointUpdate").value = response.point;
            document.getElementById("ageUpdate").value = response.age;
        }
    });
}

function updateStudent() {
    let nameUpdate = document.getElementById("nameUpdate").value;
    let pointUpdate = document.getElementById("pointUpdate").value;
    let ageUpdate = document.getElementById("ageUpdate").value;
    let classId = document.getElementById("classId").value;

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: 'http://localhost:8080/api/students/' + updateId,
        type: 'PUT',
        data: JSON.stringify({
            name: nameUpdate,
            point: pointUpdate,
            age: ageUpdate,
            classes: {
                id: classId
            }
        }),

        success: showAll
    })
    $('#myUpdateStudentModal').modal('hide');
}