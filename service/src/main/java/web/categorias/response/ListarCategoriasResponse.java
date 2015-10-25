package web.categorias.response;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "tribos")
public class ListarCategoriasResponse {

	String nome;
	
	public ListarCategoriasResponse() {
	}

	public ListarCategoriasResponse(String nome) {
		this.nome = nome;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
}
