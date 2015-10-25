package model.tribo;

import java.util.ArrayList;
import java.util.List;

public enum DiaDaSemana {

	SEGUNDA("Segunda-feira"),
	TERCA("Terça-feira"),
	QUARTA("Quarta-feira"),
	QUINTA("Quinta-feira"),
	SEXTA("Sexta-feira"),
	SABADO("Sábado"),
	DOMINGO("Domingo");
	
	private String descricao;

	private DiaDaSemana(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
	
	public static List<DiaDaSemana> converter(List<String> diasDaSemana) {
		List<DiaDaSemana> diasDaSemanaEnum = new ArrayList<>();
		for (String diaDaSemana : diasDaSemana) {
			diasDaSemanaEnum.add(DiaDaSemana.valueOf(diaDaSemana));
		}
		return diasDaSemanaEnum;
	}

}
