package web.usuarios.request;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "cadastraUsuarioRequest")
public class CadastraUsuarioRequest {

	String numero;
	
	List<String> atividades;

	public CadastraUsuarioRequest(String numero, List<String> atividades) {
		super();
		this.numero = numero;
		this.atividades = atividades;
	}

	public CadastraUsuarioRequest() {
		super();
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public List<String> getAtividades() {
		return atividades;
	}

	public void setAtividades(List<String> atividade) {
		this.atividades = atividade;
	}
}
