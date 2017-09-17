var apiUrl = 'http://localhost:3000/api/';

var $title, $body, $image, $todoList;

$(document).ready(function() {
	$('#todoForm').on('submit', formHandle);

	$title = $('#title');
	$body = $('#body');
	$image = $('#image');
	$todoList = $('#todo-items');

	getTodos();
});

function getTodos() {
	var list = '';
	var imageUrl = false;
	$.get(apiUrl+ 'todos').then(function(res) {
		res.forEach(function(todo){
			list += `
					<div class="row">
					 <div class="col-md-12">
	                     <h1>`+todo.title+`</h1>
	                     <div style="width:300px;">`;
	                     if(todo.image){
	                     	imageUrl = todo.image;
	                     	list += `<img src='/api/attachments/image/download/`+todo.image;
	                     } else {
	                     	list += `<img src='http://via.placeholder.com/350x150`;
	                     }
	                      list+= `' alt="post img" class="pull-left img-responsive thumb margin10 img-thumbnail"></div>
	                     <p style="padding:5px;" class="col-md-5 text-justify">
	                         `+todo.body+`
	                     </p>
	                     <div class="col-md-2"><a class="btn btn-primary pull-right marginBottom10" href="#">Share Facebook</a>
	                     <a class="btn btn-success pull-right marginBottom10" href="#">Share Twitter</a>
	                      <a onclick='deleteTodo(`+todo.id+`,"`+imageUrl+`")' class="btn btn-danger pull-right marginBottom10" href="#">Delete Todo</a> </div>
	                 </div>
                 </div>`;
		});
		$todoList.html(list);
	});
}

function formHandle(e) {
	e.preventDefault();
	var todo = {
		title: $title.val(),
		body: $body.val()
	}
	console.log(todo);

	    $.post(apiUrl + 'todos', todo).then(function(res) {

        todo = res;

        var promises = [];

        if($image.val() != '') {
            console.log('i need to process the Image upload');
            promises.push(sendFile($image.get(0).files[0], apiUrl + 'attachments/image/upload'));
        }

        Promise.all(promises).then(function(results) {
            if(promises.length >= 1) {
                results.forEach(function(resultOb) {
                    if(resultOb.result.files && resultOb.result.files.file[0].container) {
                        todo[resultOb.result.files.file[0].container] = resultOb.result.files.file[0].name;
                    }
                });
                console.dir(todo);
                var id = todo.id;
                delete todo.id;
                $.post(apiUrl + 'todos/'+id+'/replace', todo).then(function() {
                    getTodos();
                });
            } else {
                getTodos();
            }
        });
        $title.val('');
        $body.val('');
    });
}

function sendFile(file, url) {
    return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        var fd = new FormData();

        xhr.open("POST", url, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        fd.append('file', file);
        xhr.send(fd);

    });
}

function deleteTodo(id,image) {
	//console.log('Id',image);
	$.ajax({
	    url: apiUrl+'todos/'+id,
	    type: 'DELETE',
	    success: function(result) {
	        if(image != false) {
				$.ajax({
	    			url: apiUrl+'attachments/image/files/'+image,
	    			type: 'DELETE',
	   				success: function(result) {
	        			console.log('Yes we did');
	    			}
					});
			}
	    }
	});
	getTodos();
}
