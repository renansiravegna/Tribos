package web.categorias.response;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "tribos")
public class ListarCategoriasResponse {

	String nome;
	
	List<String> atividades;
	
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

	public List<String> getAtividades() {
		return atividades;
	}

	public void setAtividades(List<String> atividades) {
		this.atividades = atividades;
	}
	
}
