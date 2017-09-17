var apiUrl = 'http://localhost:3000/api/';

var $title, $body, $image, $todoList;

$(document).ready(function() {
	$('#todoForm').on('submit', function(){
		console.log('form submitted');
	});

	$title = $('#title');
	$body = $('#body');
	$image = $('#image');
	$todoList = $('#todo-items');

	getTodos();
});

function getTodos() {
	var list = '';
	$.get(apiUrl+ 'todos').then(function(res) {
		res.forEach(function(todo){
			list += `
					<div class="row">
					 <div class="col-md-12">
	                     <h1>`+todo.title+`</h1>
	                     <div style="width:300px;">`;
	                     if(todo.image){
	                     	list += `<img src='/api/attachments/image/download/`+todo.image;
	                     } else {
	                     	list += `<img src='http://via.placeholder.com/350x150'`;
	                     }
	                      list+= ` alt="post img" class="pull-left img-responsive thumb margin10 img-thumbnail"></div>
	                     <p style="padding:5px;" class="col-md-5 text-justify">
	                         `+todo.body+`
	                     </p>
	                     <div class="col-md-2"><a class="btn btn-primary pull-right marginBottom10" href="#">Share Facebook</a>
	                     <a class="btn btn-success pull-right marginBottom10" href="#">Share Twitter</a>
	                      <a class="btn btn-danger pull-right marginBottom10" href="#">Delete Todo</a> </div>
	                 </div>
                 </div>`;
		});
		$todoList.html(list);
	});
}
