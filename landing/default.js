$(function() {
	$('#cadastro form').on('submit', function(e){
		e.preventDefault();
		$('#pronto').hide();

		if(validarCadastro()) {
			var dadosDoFormulario = $(this).serialize(); 
			console.log(dadosDoFormulario);
			console.log(JSON.stringify(dadosDoFormulario));
			
			// enviar para api

			$('#pronto').show();
		}
	});

	$('.ui.checkbox').checkbox();

	$('input[type="tel"]').inputmask('(99) 9999[9]-9999'); 
	$('input[type="number"]').inputmask("9999"); 
});

function validarCadastro() {
	var temErro = false;

	$('.field').removeClass('error');

	function adicionarErro(campo) {
		$(campo).parents('.field').addClass('error');
		temErro = true;
	}

	$('input.required').each(function(){
		var campo = this;

		if($(campo).is('[type="checkbox"],[type="radio"]') ) {
			var name = $(campo).attr('name'); 
			var opcoesMarcadas = $('input[name="' + name + '"]:checked');

			if(opcoesMarcadas.length === 0)
				adicionarErro(campo);
		} else {
			if(!$(campo).val())
				adicionarErro(campo);
		}
	});

	return !temErro;
}