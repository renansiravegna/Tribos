package web.tribos.response;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "tribos")
public class ListarTribosResponse {
	
	String nome;

	List<String> diasDaSemana;
	
	Integer populacao;
	
	Coordenada coordenada;
	
	String atividade;
	
	public ListarTribosResponse() {
	}

	public ListarTribosResponse(String categoria, List<String> diasDaSemana, Integer populacao, Coordenada coordenada, String atividade) {
		this.nome = categoria;
		this.diasDaSemana = diasDaSemana;
		this.populacao = populacao;
		this.coordenada = coordenada;
		this.atividade = atividade;
	}

	@XmlElement
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
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

	public void setAtividade(String atividade) {
		this.atividade = atividade;
	}
	
	public String getAtividade() {
		return atividade;
	}
}