package web.tribos.response;

import java.util.Date;

public class ListarTribosResponse {
	
	private String categoria;
	
	private Date data;
	
	private Integer populacao;
	
	private Coordenada coordenada;
	
	public ListarTribosResponse() {
	}

	public ListarTribosResponse(String categoria, Date data, Integer populacao, Coordenada coordenada) {
		this.categoria = categoria;
		this.data = data;
		this.populacao = populacao;
		this.coordenada = coordenada;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public Integer getPopulacao() {
		return populacao;
	}

	public void setPopulacao(Integer populacao) {
		this.populacao = populacao;
	}

	public Coordenada getCoordenada() {
		return coordenada;
	}

	public void setCoordenada(Coordenada coordenada) {
		this.coordenada = coordenada;
	}
}