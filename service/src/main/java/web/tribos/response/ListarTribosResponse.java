package web.tribos.response;

import java.util.Date;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "tribos")
public class ListarTribosResponse {
	
	String categoria;

	List<String> diasDaSemana;
	
	Integer populacao;
	
	Coordenada coordenada;
	
	public ListarTribosResponse() {
	}

	public ListarTribosResponse(String categoria, List<String> diasDaSemana, Integer populacao, Coordenada coordenada) {
		this.categoria = categoria;
		this.diasDaSemana = diasDaSemana;
		this.populacao = populacao;
		this.coordenada = coordenada;
	}

	@XmlElement
	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	
	@XmlElement
	public Integer getPopulacao() {
		return populacao;
	}

	public void setPopulacao(Integer populacao) {
		this.populacao = populacao;
	}
	
	@XmlElement
	public Coordenada getCoordenada() {
		return coordenada;
	}

	public void setCoordenada(Coordenada coordenada) {
		this.coordenada = coordenada;
	}

	@XmlElement
	public List<String> getDiasDaSemana() {
		return diasDaSemana;
	}

	public void setDiasDaSemana(List<String> diasDaSemana) {
		this.diasDaSemana = diasDaSemana;
	}
}