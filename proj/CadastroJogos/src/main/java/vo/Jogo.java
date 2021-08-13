package vo;

import java.util.Objects;

public class Jogo {
	private String nome;
	private String genero;
	private String anoLan;
	
	
	public Jogo() {
		
	}
	
	public Jogo(String nome, String genero, String anoLan) {
		this.nome = nome;
		this.genero = genero;
		this.anoLan = anoLan;
	}
	
	public Jogo(String[] csv){
		this.nome = csv[0];
		this.genero = csv[1];
		this.anoLan = csv[2];
	}

	public String getNome() {
		return nome;
	}

	public String getGenero() {
		return genero;
	}

	public String getAnoLan() {
		return anoLan;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setGenero(String genero) {
		this.genero = genero;
	}

	public void setAnoLan(String anoLan) {
		this.anoLan = anoLan;
	}
	//key
	@Override
	public int hashCode() {
		return Objects.hash(nome);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Jogo other = (Jogo) obj;
		return Objects.equals(nome, other.nome);
	}

	@Override
	public String toString() {
		return nome +"\t"+ genero +"\t"+ anoLan+"\n";
	}
	
	public String toCSV() {
		return nome +";"+ genero +";"+ anoLan+"\r\n";
	}
	
	public String toHTML() {
		return "<tr><td>" + nome + "<td><td>" + genero + "<td><td>" + anoLan +"<td><td>";
	}
	
}
