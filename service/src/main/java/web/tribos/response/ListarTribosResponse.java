package web.tribos.response;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "tribos")
public class ListarTribosResponse {
	
	String categoria;
	
	Date data;
	
	Integer populacao;
	
	Coordenada coordenada;
	
	public ListarTribosResponse() {
	}

	public ListarTribosResponse(String categoria, Date data, Integer populacao, Coordenada coordenada) {
		this.categoria = categoria;
		this.data = data;
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
	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
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
}