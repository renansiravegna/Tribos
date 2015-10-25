package model.tribo;

import java.util.ArrayList;
import java.util.List;

import com.google.appengine.api.datastore.Entity;
import com.google.gson.Gson;

import model.entidadebase.EntidadeBase;
import web.tribos.response.Coordenada;

public class Tribo extends EntidadeBase {

	private String nome;
	
	private List<DiaDaSemana> diasDaSemana = new ArrayList<>();
	
	private Coordenada coordenada;

	private String atividade;

	public Tribo() {
		super();
	}

	public Tribo(String nome, List<DiaDaSemana> diasDaSemana, Coordenada coordenada, String atividade) {
		super();
		this.nome = nome;
		this.diasDaSemana = diasDaSemana;
		this.coordenada = coordenada;
		this.setAtividade(atividade);
	}
	
	@SuppressWarnings("unchecked")
	public Tribo(Entity entity) {
		id = entity.getProperty("id").toString();
		nome = entity.getProperty("nome").toString();
		coordenada = new Gson().fromJson(entity.getProperty("coordenada").toString(), Coordenada.class);
		diasDaSemana = DiaDaSemana.converter((List<String>) entity.getProperty("diasDaSemana"));
		setAtividade(entity.getProperty("atividade").toString());
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public List<String> getDiasDaSemana() {
		List<String> diasDaSemana = new ArrayList<>();
		for (DiaDaSemana diaDaSemana : this.diasDaSemana) {
			diasDaSemana.add(diaDaSemana.name());
		}
		return diasDaSemana;
	}

	public void setDiasDaSemana(List<DiaDaSemana> diasDaSemana) {
		this.diasDaSemana = diasDaSemana;
	}

	public Coordenada getCoordenada() {
		return coordenada;
	}

	public void setCoordenada(Coordenada coordenada) {
		this.coordenada = coordenada;
	}
	
	@Override
	public Entity toEntity() {
		Entity entity = new Entity(Tribo.class.getName());
		entity.setProperty("id", id);
		entity.setProperty("nome", nome);
		entity.setProperty("atividade", getAtividade());
		entity.setProperty("diasDaSemana", getDiasDaSemana());
		entity.setProperty("coordenada", new Gson().toJson(coordenada));
		
		return entity;
	}

	public String getAtividade() {
		return atividade;
	}

	public void setAtividade(String atividade) {
		this.atividade = atividade;
	}
}