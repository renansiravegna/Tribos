package model.tribo;

import java.util.ArrayList;
import java.util.List;

import com.google.appengine.api.datastore.Entity;
import com.google.gson.Gson;

import model.entidadebase.EntidadeBase;
import web.tribos.response.Coordenada;

public class Tribo extends EntidadeBase {

	private String categoria;
	
	private List<DiaDaSemana> diasDaSemana = new ArrayList<>();
	
	private Coordenada coordenada;

	public Tribo() {
		super();
	}

	public Tribo(String categoria, List<DiaDaSemana> diasDaSemana, Coordenada coordenada) {
		super();
		this.categoria = categoria;
		this.diasDaSemana = diasDaSemana;
		this.coordenada = coordenada;
	}
	
	@SuppressWarnings("unchecked")
	public Tribo(Entity entity) {
		id = entity.getProperty("id").toString();
		categoria = entity.getProperty("categoria").toString();
		coordenada = new Gson().fromJson(entity.getProperty("coordenada").toString(), Coordenada.class);
		diasDaSemana = DiaDaSemana.converter((List<String>) entity.getProperty("diasDaSemana"));
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
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
		entity.setProperty("categoria", categoria);
		entity.setProperty("diasDaSemana", getDiasDaSemana());
		entity.setProperty("coordenada", new Gson().toJson(coordenada));
		
		return entity;
	}
}