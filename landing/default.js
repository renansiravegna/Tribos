$(function() {
	$('#cadastro').on('submit', function(e){
		e.preventDefault();
		$('#pronto').hide();

		if(validarCadastro()) {

		}

		$('#pronto').show();
	});

	$('.ui.checkbox').checkbox();

	$('input[type="tel"]').inputmask('(99) 9999[9]-9999'); 
	$('input[type="number"]').inputmask("9999"); 
});

function validarCadastro() {
	var erros = [];

	

	return erros.length ? true : false;
}