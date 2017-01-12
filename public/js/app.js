$(document).ready(function(){

	$('.deleteExpenseLink').click(function(e){
		e.preventDefault();
		var expense = $(this).attr('data-id');
		var tr = $(this).parent().parent();
		$.ajax({
			url: '/expense',
			method: 'DELETE',
			data: {
				id: expense
			},
			success: function(data){
				tr.remove();
			}
		});
	});

});